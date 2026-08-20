import { useState } from 'react'
import { SectionEyebrow } from './Shared'
import { submitEnquiry } from '../lib/submitEnquiry'

export default function BulkOrderForm() {
  const [values, setValues] = useState({})
  const [status, setStatus] = useState('idle')

  function update(name, value) {
    setValues((v) => ({ ...v, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitEnquiry('Bulk Supply Interest', values)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="bulk" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <SectionEyebrow>Coming soon</SectionEyebrow>
        <h2 className="font-display font-700 text-4xl mb-4 text-market-green">
          Interested in Bulk Supply?
        </h2>
        <p className="text-ink/80 mb-6 max-w-md">
          We're setting up bulk supply arrangements for schools, churches,
          offices and hotels. Tell us what you'd need and how often, and
          we'll be in touch as this rolls out.
        </p>
        <ul className="space-y-3 text-sm text-ink/70">
          <li>✓ Priced for bulk quantities</li>
          <li>✓ Delivery to your site</li>
          <li>✓ Recurring monthly supply available</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="bg-card border-2 border-market-green/15 rounded-3xl p-8 space-y-4">
        {status === 'done' ? (
          <p className="text-market-green font-semibold">
            Thanks — we've received your interest and will be in touch.
          </p>
        ) : (
          <>
            <div>
              <label className="text-sm font-medium block mb-1">Organisation name</label>
              <input className="w-full rounded-xl border border-ink/15 px-4 py-2 bg-card" placeholder="e.g. St. Mary's Academy"
                onChange={(e) => update('organisation', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Items needed</label>
              <textarea className="w-full rounded-xl border border-ink/15 px-4 py-2 bg-card" rows={3} placeholder="e.g. cooking oil, rice, cleaning supplies"
                onChange={(e) => update('items', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Frequency</label>
                <input className="w-full rounded-xl border border-ink/15 px-4 py-2 bg-card" placeholder="Monthly"
                  onChange={(e) => update('frequency', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Phone</label>
                <input className="w-full rounded-xl border border-ink/15 px-4 py-2 bg-card" placeholder="07xx xxx xxx"
                  onChange={(e) => update('phone', e.target.value)} />
              </div>
            </div>
            <button disabled={status === 'sending'} className="w-full bg-market-green text-paper font-semibold py-3 rounded-full hover:bg-market-green-light transition-colors disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Register Interest'}
            </button>
            {status === 'error' && <p className="text-sm text-red-600">Something went wrong — please try again.</p>}
          </>
        )}
      </form>
    </section>
  )
}