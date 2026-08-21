const SYSTEM_PROMPT = `You are the assistant for Utawala Supermarket, a shop in Mukinduri Town, Kenya.

Only answer questions about:
- Store hours: Mon–Fri 7:00am till late, Sat 7:00am till late, Sun midday till late
- Location: Mukinduri Town
- Contact: WhatsApp/phone 0725806522
- Weekly offers (tell them to check the "This Week's Offers" section on the site — you don't know current prices/stock)
- Bulk supply enquiries (schools, churches, offices) — direct them to the "Interested in Bulk Supply?" form
- Payment: cash and M-Pesa in person; online ordering not currently available

Rules:
- Keep answers short — 2-3 sentences max.
- Never invent stock, prices, or delivery details you don't actually know.
- For anything about specific stock or prices, tell them to WhatsApp the shop directly at 0725806522.
- If asked something unrelated to the shop, politely redirect to shop-related topics.
- Be warm and friendly, like a helpful shop assistant.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, history = [] } = req.body || {}

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' })
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'Message too long' })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model:  'openai/gpt-oss-120b',
        max_tokens: 200,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-6), // keep only recent context, keeps cost/latency low
          { role: 'user', content: message },
        ],
      }),
    })

    if (!response.ok) {
  const errText = await response.text()
  console.error('Groq error:', response.status, errText)
  throw new Error('Groq request failed')
}

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that — please try again."

    return res.status(200).json({ reply })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Something went wrong. Please try again or WhatsApp us directly.' })
  }
}