import { StampBadge, SectionEyebrow } from './Shared'

const items = [
  { name: 'Cooking Oil 2L', price: 'KES 450', seed: 'oil' },
  { name: 'Maize Flour 2kg', price: 'KES 180', seed: 'flour' },
  { name: 'Sugar 2kg', price: 'KES 260', seed: 'sugar' },
  { name: 'Rice 2kg', price: 'KES 320', seed: 'rice' },
  { name: 'Bread (Large)', price: 'KES 65', seed: 'bread' },
  { name: 'Fresh Tomatoes 1kg', price: 'KES 90', seed: 'tomato' },
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
            <div key={item.name} className="bg-card text-ink rounded-2xl overflow-hidden shadow-lg">
              <img
                src={`https://picsum.photos/seed/${item.seed}/400/260`}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-5 flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <StampBadge>{item.price}</StampBadge>
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