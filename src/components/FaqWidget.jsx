import { useState, useRef, useEffect } from 'react'

const MAX_MESSAGES = 8

export default function FaqWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm here to help with hours, location, offers, and bulk orders. What would you like to know?" },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [limitReached, setLimitReached] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const userMessageCount = messages.filter((m) => m.role === 'user').length

  async function sendMessage(e) {
    e.preventDefault()
    if (!input.trim() || sending || limitReached) return

    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setSending(true)

    try {
      const res = await fetch('/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content, history: newMessages.slice(0, -1) }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || "Sorry, something went wrong." }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: "Sorry, something went wrong — please try again or WhatsApp us directly." }])
    } finally {
      setSending(false)
      if (userMessageCount + 1 >= MAX_MESSAGES) setLimitReached(true)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          className="mb-3 w-80 max-w-[calc(100vw-3rem)] bg-card rounded-3xl shadow-2xl border-2 border-market-green/20 overflow-hidden flex flex-col"
          style={{ height: 420 }}
        >
          <div className="bg-market-green text-white px-5 py-4 flex items-center justify-between">
            <span className="font-display font-700 text-white">Utawala Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/90 hover:text-white text-lg font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-card">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-4 py-2 rounded-2xl max-w-[85%] font-medium ${
                  m.role === 'user'
                    ? 'bg-clay text-white ml-auto rounded-br-sm'
                    : 'bg-market-green text-white rounded-bl-sm'
                }`}
              >
                {m.content}
              </div>
            ))}
            {sending && <div className="text-sm text-ink/60 px-4 font-medium">Typing…</div>}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t-2 border-market-green/10 flex gap-2 bg-card">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={limitReached}
              placeholder={limitReached ? 'Chat limit reached — WhatsApp us!' : 'Ask a question…'}
              className="flex-1 rounded-full border-2 border-ink/15 px-4 py-2 text-sm bg-white text-ink placeholder:text-ink/50 disabled:opacity-50"
            />
            <button
              disabled={sending || limitReached}
              className="bg-market-green text-white rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50 hover:bg-market-green-light transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-market-green text-white shadow-xl flex items-center justify-center text-2xl border-2 border-white hover:bg-market-green-light transition-colors"
        aria-label="Open chat assistant"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}