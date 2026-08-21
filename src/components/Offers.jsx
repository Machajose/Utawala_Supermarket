import { useEffect, useState, useRef } from 'react'
import { StampBadge, SectionEyebrow } from './Shared'
import { supabase } from '../lib/supabaseClient'

export default function Offers() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const trackRef = useRef(null)

  useEffect(() => {
    async function loadOffers() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (error) {
        setStatus('error')
        return
      }
      setItems(data)
      setStatus('done')
    }
    loadOffers()
  }, [])

  function scrollByCard(dir) {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.firstChild?.offsetWidth || 260
    track.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' })
  }

  return (
    <section id="offers" className="bg-market-green text-paper py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <SectionEyebrow><span className="text-marigold">This week</span></SectionEyebrow>
            <h2 className="font-display font-700 text-4xl">This Week's Offers</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scrollByCard(-1)} aria-label="Previous offers"
              className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-marigold transition-colors">‹</button>
            <button onClick={() => scrollByCard(1)} aria-label="Next offers"
              className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-marigold transition-colors">›</button>
          </div>
        </div>

        {status === 'loading' && <p className="text-paper/70">Loading offers…</p>}
        {status === 'error' && <p className="text-paper/70">Couldn't load offers right now.</p>}

        {status === 'done' && (
          <div ref={trackRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
            {items.map((item) => (
              <div key={item.id} className="snap-start shrink-0 w-[240px] rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: '#FBFAF6' }}>
                <div className="bg-white h-40 flex items-center justify-center p-3">
                  <img src={item.image_url} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="p-5 flex items-center justify-between gap-3" style={{ backgroundColor: '#FBFAF6' }}>
                  <span className="font-bold text-[15px] leading-snug" style={{ color: '#1A1D23' }}>
                    {item.name}
                  </span>
                  <StampBadge className="shrink-0">{item.price}</StampBadge>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-paper/70 text-sm">
          Offers update weekly — share this page on WhatsApp status to catch the next round. Swipe or use the arrows to see more.
        </p>
      </div>
    </section>
  )
}