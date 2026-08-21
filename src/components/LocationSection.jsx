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
            <li><strong className="text-marigold">Mon – Fri:</strong> 7:00am till Late</li>
            <li><strong className="text-marigold">Saturday:</strong> 7:00am till Late</li>
            <li><strong className="text-marigold">Sunday:</strong> Midday till Late</li>
            <li><strong className="text-marigold">Phone / WhatsApp:</strong> 0725 806 522</li>
          </ul>
        </div>
        <div className="rounded-3xl overflow-hidden aspect-video">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.3096210350727!2d37.26159817435677!3d-0.522973335266931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18288158533702ab%3A0xa07b792e02e0a6b6!2sUtawala%20Supermarket!5e1!3m2!1sen!2ske!4v1787292778563!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Utawala Supermarket location"
          />
        </div>
      </div>
    </section>
  )
}