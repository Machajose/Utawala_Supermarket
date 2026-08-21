import { useState } from 'react'
import { SectionEyebrow } from './Shared'
import { submitEnquiry } from '../lib/submitEnquiry'

export default function Loyalty() {
  const [values, setValues] = useState({})
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitEnquiry('Loyalty Signup', values)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <SectionEyebrow>Stay in the loop</SectionEyebrow>
      <h2 className="font-display font-700 text-4xl mb-4 text-market-green">Join Our Loyalty List</h2>
      <p className="text-ink/70 max-w-md mx-auto mb-8">
        Get first word on weekly offers and bulk deals, straight to WhatsApp or email.
      </p>
      {status === 'done' ? (
        <p className="text-market-green font-semibold">You're on the list — thank you!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto flex-wrap justify-center">
          <input required className="flex-1 min-w-[180px] rounded-full border border-ink/15 px-5 py-3" placeholder="Your name"
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} />
          <input required className="flex-1 min-w-[180px] rounded-full border border-ink/15 px-5 py-3" placeholder="Phone number"
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))} />
          <input type="email" className="flex-1 min-w-[180px] rounded-full border border-ink/15 px-5 py-3" placeholder="Email (optional)"
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
          <button disabled={status === 'sending'} className="bg-market-green text-paper font-semibold px-6 py-3 rounded-full hover:bg-market-green-light transition-colors disabled:opacity-60">
            {status === 'sending' ? 'Joining…' : 'Join'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-sm text-red-600 mt-3">Something went wrong — please try again.</p>}
    </section>
  )
}