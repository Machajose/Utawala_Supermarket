const SYSTEM_PROMPT = `You are the Utawala Supermarket assistant — a friendly, knowledgeable helper for customers of a shop in Mukinduri Town, Kenya. You can help with questions about products we stock, weekly offers, store hours, location, bulk orders, and how to reach us.

You can discuss:
- General product categories we stock: groceries & pantry, snacks & beverages, bakery & dairy, household & cleaning, personal care & hygiene, stationery
- Store hours: Mon–Fri 7:00am till late, Sat 7:00am till late, Sun midday till late
- Location: Mukinduri Town
- Contact: WhatsApp/phone 0725 806 522
- Weekly offers (tell them to check the "This Week's Offers" section on the site — you don't know current prices/live stock for specific items)
- Bulk supply enquiries (schools, churches, offices) — direct them to the "Interested in Bulk Supply?" form
- Payment: cash and M-Pesa in person; online ordering not currently available

Rules:
- Keep answers short — 2-3 sentences max.
- You can talk generally about what KINDS of products we stock (e.g. "yes, we carry cooking oil, rice, sugar, and other pantry staples"), but never invent specific current stock, prices, or availability you don't actually know.
- For anything about specific stock levels or exact prices, tell them to WhatsApp the shop directly at 0725 806 522.
- If asked something completely unrelated to the shop, politely redirect to shop-related topics.
- Be warm and helpful, like a friendly shop assistant who knows the store well.`

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