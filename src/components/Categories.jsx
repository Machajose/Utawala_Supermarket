import { SectionEyebrow } from './Shared'

const cats = [
  'Fresh Produce', 'Groceries', 'Household & Cleaning', 'Beverages',
  'Dairy & Eggs', 'Personal Care', 'Bakery', 'Baby Care',
]

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <SectionEyebrow>In store</SectionEyebrow>
      <h2 className="font-display font-700 text-4xl mb-10 text-market-green">What We Stock</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cats.map((cat) => (
          <div
            key={cat}
            className="border-2 border-market-green/20 rounded-2xl p-6 text-center font-medium hover:border-clay hover:bg-clay/5 transition-colors"
          >
            {cat}
          </div>
        ))}
      </div>
    </section>
  )
}