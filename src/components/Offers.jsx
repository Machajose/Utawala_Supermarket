import { StampBadge, SectionEyebrow } from './Shared'
import cookingOil from '../assets/cooking oil.jpeg'
import unga from '../assets/unga.jpeg'
import sugar from '../assets/sugar.jpeg'
import rice from '../assets/rice.jpeg'
import bread from '../assets/bread.jpeg'
//import tomatoes from '../assets/tomatoes.jpg'

const items = [
  { name: 'Cooking Oil 2L', price: 'KES 450', image: cookingOil },
  { name: 'Maize Flour 2kg', price: 'KES 180', image: unga },
  { name: 'Sugar 2kg', price: 'KES 260', image: sugar },
  { name: 'Rice 2kg', price: 'KES 320', image: rice },
  { name: 'Bread (Large)', price: 'KES 65', image: bread },
  //{ name: 'Fresh Tomatoes 1kg', price: 'KES 90', image: tomatoes },
]

export default function Offers() {
  return (
    <section id="offers" className="bg-market-green text-paper py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionEyebrow>
          <span className="text-marigold">This week</span>
        </SectionEyebrow>
        <h2 className="font-display font-700 text-4xl mb-10">This Week's Offers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.name} className="bg-card rounded-2xl overflow-hidden shadow-lg">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-5 flex items-center justify-between gap-3">
                <span className="font-semibold text-ink text-[15px] leading-snug">{item.name}</span>
                <StampBadge className="shrink-0">{item.price}</StampBadge>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-paper/70 text-sm">
          Offers update weekly — share this page on WhatsApp status to catch the next round.
        </p>
      </div>
    </section>
  )
}