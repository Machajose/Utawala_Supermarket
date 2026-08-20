import { useState } from 'react'

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [entries, setEntries] = useState(null)
  const [status, setStatus] = useState('idle')

  async function load(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`/api/admin?key=${encodeURIComponent(key)}`)
      if (!res.ok) throw new Error('Unauthorized or error')
      const data = await res.json()
      setEntries(data.entries)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-paper p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-700 text-3xl text-market-green mb-6">Utawala Supermarket — Enquiries</h1>

        {!entries && (
          <form onSubmit={load} className="flex gap-3 mb-8">
            <input type="password" value={key} onChange={(e) => setKey(e.target.value)}
              placeholder="Admin key" className="flex-1 rounded-xl border border-ink/15 px-4 py-2" />
            <button className="bg-market-green text-paper font-semibold px-6 py-2 rounded-xl">
              {status === 'loading' ? 'Loading…' : 'View Enquiries'}
            </button>
          </form>
        )}

        {status === 'error' && <p className="text-red-600 mb-4">Incorrect key or something went wrong.</p>}

        {entries && (
          <div className="space-y-4">
            <p className="text-sm text-ink/60">{entries.length} enquiries — most recent first</p>
            {entries.length === 0 && <p className="text-ink/60">No enquiries yet.</p>}
            {entries.map((e) => (
              <div key={e.id} className="bg-card rounded-2xl border border-ink/10 p-5 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-market-green">{e.business}</span>
                  <span className="text-xs text-ink/40">{new Date(e.created_at).toLocaleString()}</span>
                </div>
                <dl className="text-sm space-y-1">
                  {Object.entries(e.fields).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="text-ink/50 capitalize">{k}:</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}