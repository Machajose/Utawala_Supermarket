import { useRef } from 'react'
import { StampBadge, SectionEyebrow } from './Shared'
import cookingOil from '../assets/cooking oil.jpeg'
import unga from '../assets/unga.jpeg'
import sugar from '../assets/sugar.jpeg'
import rice from '../assets/rice.jpeg'
import bread from '../assets/bread.jpeg'
//import tomatoes from '../assets/tomatoes.jpeg'

const items = [
  { name: 'Cooking Oil 2L', price: 'KES 450', image: cookingOil },
  { name: 'Maize Flour 2kg', price: 'KES 180', image: unga },
  { name: 'Sugar 2kg', price: 'KES 260', image: sugar },
  { name: 'Rice 2kg', price: 'KES 320', image: rice },
  { name: 'Bread (Large)', price: 'KES 65', image: bread },
  //{ name: 'Fresh Tomatoes 1kg', price: 'KES 90', image: tomatoes },
]

export default function Offers() {
  const trackRef = useRef(null)

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
            <SectionEyebrow>
              <span className="text-marigold">This week</span>
            </SectionEyebrow>
            <h2 className="font-display font-700 text-4xl">This Week's Offers</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Previous offers"
              className="w-10 h-10 rounded-full bg-card text-ink flex items-center justify-center hover:bg-marigold transition-colors"
            >
              ‹
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Next offers"
              className="w-10 h-10 rounded-full bg-card text-ink flex items-center justify-center hover:bg-marigold transition-colors"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="snap-start shrink-0 w-[240px] bg-card rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="bg-white h-40 flex items-center justify-center p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="bg-card p-5 flex items-center justify-between gap-3">
                <span className="font-semibold text-ink text-[15px] leading-snug">{item.name}</span>
                <StampBadge className="shrink-0">{item.price}</StampBadge>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-paper/70 text-sm">
          Offers update weekly — share this page on WhatsApp status to catch the next round. Swipe or use the arrows to see more.
        </p>
      </div>
    </section>
  )
}