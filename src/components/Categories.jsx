import { useState } from 'react'
import { SectionEyebrow } from './Shared'
import { supabase } from '../lib/supabaseClient'

const cats = [
  'Groceries & Pantry',
  'Snacks & Beverages',
  'Bakery & Dairy',
  'Household & Cleaning',
  'Personal Care & Hygiene',
  'Stationery',
]

export default function Categories() {
  const [active, setActive] = useState(null)
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('idle')

  async function handleClick(cat) {
    if (active === cat) {
      setActive(null)
      return
    }
    setActive(cat)
    setStatus('loading')

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', cat)

    if (error) {
      setStatus('error')
      return
    }
    setProducts(data)
    setStatus('done')
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <SectionEyebrow>In store</SectionEyebrow>
      <h2 className="font-display font-700 text-4xl mb-10 text-market-green">What We Stock</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`border-2 rounded-2xl p-6 text-center font-medium transition-colors ${
              active === cat
                ? 'border-clay bg-clay/10 text-clay'
                : 'border-market-green/20 hover:border-clay hover:bg-clay/5 text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-8 rounded-3xl p-6" style={{ backgroundColor: '#FBFAF6' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-700 text-2xl text-market-green">{active}</h3>
            <button onClick={() => setActive(null)} className="text-sm text-ink/50 hover:text-ink">
              Close ✕
            </button>
          </div>

          {status === 'loading' && <p className="text-ink/60">Loading products…</p>}
          {status === 'error' && <p className="text-ink/60">Couldn't load products right now.</p>}
          {status === 'done' && products.length === 0 && (
            <p className="text-ink/60">No products listed in this category yet — WhatsApp us to ask what's in stock.</p>
          )}

          {status === 'done' && products.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="rounded-xl overflow-hidden shadow-sm bg-white">
                  <div className="bg-white h-28 flex items-center justify-center p-2">
                    <img src={p.image_url} alt={p.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2" style={{ backgroundColor: '#FBFAF6' }}>
                    <span className="text-sm font-semibold" style={{ color: '#1A1D23' }}>{p.name}</span>
                    <span className="text-sm font-semibold text-clay">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}