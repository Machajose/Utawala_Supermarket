import { SectionEyebrow } from './Shared'

export default function LocationSection() {
  return (
    <section id="location" className="bg-market-green text-paper py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <SectionEyebrow><span className="text-marigold">Find us</span></SectionEyebrow>
          <h2 className="font-display font-700 text-4xl mb-6">Visit the Shop</h2>
          <ul className="space-y-3 text-paper/85">
            <li><strong className="text-marigold">Location:</strong> Mukinduri Town</li>
            <li><strong className="text-marigold">Hours:</strong> Mon – Fri, 7:00am  till Late</li>
            <li><strong className="text-marigold">Hours:</strong> Sat, 7:00am  till Late</li>
            <li><strong className="text-marigold">Hours:</strong> Sun, Midday  till Late</li>
            <li><strong className="text-marigold">Phone / WhatsApp:</strong> 0725806522</li>
          </ul>
        </div>
        <div className="rounded-3xl overflow-hidden aspect-video bg-paper/10 flex items-center justify-center text-paper/50 text-sm">
          Map embed placeholder
        </div>
      </div>
    </section>
  )
}