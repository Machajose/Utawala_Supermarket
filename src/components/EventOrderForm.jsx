import { useState } from 'react'
import { SectionEyebrow } from './Shared'
import { submitEnquiry } from '../lib/submitEnquiry'

export default function EventOrderForm() {
  const [values, setValues] = useState({})
  const [status, setStatus] = useState('idle')

  function update(name, value) {
    setValues((v) => ({ ...v, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitEnquiry('Event Order', values)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="events" className="bg-clay/10 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <form onSubmit={handleSubmit} className="bg-card border-2 border-clay/20 rounded-3xl p-8 space-y-4 order-2 md:order-1">
          {status === 'done' ? (
            <p className="text-clay font-semibold">
              Thanks — we've received your enquiry and will follow up with a quote.
            </p>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium block mb-1">Event type</label>
                <input className="w-full rounded-xl border border-ink/15 px-4 py-2" placeholder="Wedding, funeral, church event..."
                  onChange={(e) => update('eventType', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Date</label>
                  <input type="date" className="w-full rounded-xl border border-ink/15 px-4 py-2"
                    onChange={(e) => update('date', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Guests (approx.)</label>
                  <input className="w-full rounded-xl border border-ink/15 px-4 py-2" placeholder="150"
                    onChange={(e) => update('guests', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Delivery location</label>
                <input className="w-full rounded-xl border border-ink/15 px-4 py-2" placeholder="e.g. Kutus, Kerugoya..."
                  onChange={(e) => update('location', e.target.value)} />
              </div>
              <button disabled={status === 'sending'} className="w-full bg-clay text-paper font-semibold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Get a Quote'}
              </button>
              {status === 'error' && <p className="text-sm text-red-600">Something went wrong — please try again.</p>}
            </>
          )}
        </form>
        <div className="order-1 md:order-2">
          <SectionEyebrow>Planning something?</SectionEyebrow>
          <h2 className="font-display font-700 text-4xl mb-4 text-market-green">Event & Party Orders</h2>
          <p className="text-ink/80 max-w-md">
            Weddings, funerals, church functions — get a fast, competitive
            quote on bulk supplies before you commit elsewhere. We deliver
            straight to the venue.
          </p>
        </div>
      </div>
    </section>
  )
}