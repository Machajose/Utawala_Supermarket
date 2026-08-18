import { useState } from 'react'

const WHATSAPP_NUMBER = '254700000000' // placeholder — swap for real number

function StampBadge({ children, className = '' }) {
  return (
    <span
      className={`stamp inline-block bg-marigold text-market-green font-display font-700 text-sm px-3 py-1 rounded-full border-2 border-market-green shadow-sm ${className}`}
    >
      {children}
    </span>
  )
}

function SectionEyebrow({ children }) {
  return (
    <p className="uppercase tracking-[0.2em] text-xs font-semibold text-clay mb-3">
      {children}
    </p>
  )
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-display font-700 text-xl text-market-green">
          Utawala Supermarket
        </a>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#offers" className="hover:text-clay transition-colors">Offers</a>
          <a href="#bulk" className="hover:text-clay transition-colors">Bulk Orders</a>
          <a href="#events" className="hover:text-clay transition-colors">Events</a>
          <a href="#location" className="hover:text-clay transition-colors">Visit Us</a>
        </nav>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          className="bg-market-green text-paper text-sm font-semibold px-4 py-2 rounded-full hover:bg-market-green-light transition-colors"
        >
          Order on WhatsApp
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="max-w-6xl mx-auto px-6 pt-14 pb-20 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <StampBadge>Open Daily · 7am – 9pm</StampBadge>
        <h1 className="font-display font-700 text-5xl md:text-6xl leading-[1.05] mt-6 text-market-green">
          Fresh stock,
          <br />
          fair prices,
          <br />
          <span className="text-clay">no long queue.</span>
        </h1>
        <p className="mt-6 text-lg text-ink/80 max-w-md">
          Your neighbourhood supermarket in [Town Name] — groceries, household
          essentials and fresh produce, with delivery and bulk orders sorted
          over WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="bg-clay text-paper font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Order for Delivery
          </a>
          <a
            href="#location"
            className="border-2 border-market-green text-market-green font-semibold px-6 py-3 rounded-full hover:bg-market-green hover:text-paper transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
      <div className="relative">
        <img
          src="https://picsum.photos/seed/supermarket-shelf/700/560"
          alt="Supermarket shelves stocked with groceries"
          className="rounded-3xl w-full object-cover aspect-[5/4] shadow-xl"
        />
        <StampBadge className="absolute -bottom-4 -left-4 bg-market-green text-paper border-paper">
          Est. placeholder
        </StampBadge>
      </div>
    </section>
  )
}

function Offers() {
  const items = [
    { name: 'Cooking Oil 2L', price: 'KES 450', seed: 'oil' },
    { name: 'Maize Flour 2kg', price: 'KES 180', seed: 'flour' },
    { name: 'Sugar 2kg', price: 'KES 260', seed: 'sugar' },
    { name: 'Rice 2kg', price: 'KES 320', seed: 'rice' },
    { name: 'Bread (Large)', price: 'KES 65', seed: 'bread' },
    { name: 'Fresh Tomatoes 1kg', price: 'KES 90', seed: 'tomato' },
  ]
  return (
    <section id="offers" className="bg-market-green text-paper py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionEyebrow>
          <span className="text-marigold">This week</span>
        </SectionEyebrow>
        <h2 className="font-display font-700 text-4xl mb-10">This Week's Offers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.name} className="bg-paper text-ink rounded-2xl overflow-hidden shadow-lg">
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

function Categories() {
  const cats = [
    'Fresh Produce', 'Groceries', 'Household & Cleaning', 'Beverages',
    'Dairy & Eggs', 'Personal Care', 'Bakery', 'Baby Care',
  ]
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

function DeliverySteps() {
  const steps = [
    { title: 'Message us', body: 'Send your list on WhatsApp — voice note is fine too.' },
    { title: 'We confirm & quote', body: 'We check stock and send you the total, including delivery.' },
    { title: 'Pay & receive', body: 'Pay on delivery or via M-Pesa, and your order arrives.' },
  ]
  return (
    <section className="awning-stripe py-2" />
  )
}

function BulkOrderForm() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section id="bulk" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
      <div>
        <SectionEyebrow>For organisations</SectionEyebrow>
        <h2 className="font-display font-700 text-4xl mb-4 text-market-green">
          Interested in Bulk Supply?
        </h2>
        <p className="text-ink/80 mb-6 max-w-md">
          Schools, churches, offices and hotels —We're setting up bulk supply for schools, churches, and offices — tell us what you'd need, and we'll be in touch as this rolls out.
        </p>
        <ul className="space-y-3 text-sm text-ink/70">
          <li>✓ Priced for bulk quantities</li>
          <li>✓ Delivery to your site</li>
          <li>✓ Recurring monthly supply available</li>
        </ul>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
        className="bg-white/60 border-2 border-market-green/15 rounded-3xl p-8 space-y-4"
      >
        {submitted ? (
          <p className="text-market-green font-semibold">
            Thanks — this is a placeholder confirmation. In the live site this sends straight to WhatsApp.
          </p>
        ) : (
          <>
            <div>
              <label className="text-sm font-medium block mb-1">Organisation name</label>
              <input className="w-full rounded-xl border border-ink/15 px-4 py-2 bg-paper" placeholder="e.g. St. Mary's Academy" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Items needed</label>
              <textarea className="w-full rounded-xl border border-ink/15 px-4 py-2 bg-paper" rows={3} placeholder="e.g. cooking oil, rice, cleaning supplies" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Frequency</label>
                <input className="w-full rounded-xl border border-ink/15 px-4 py-2 bg-paper" placeholder="Monthly" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Phone</label>
                <input className="w-full rounded-xl border border-ink/15 px-4 py-2 bg-paper" placeholder="07xx xxx xxx" />
              </div>
            </div>
            <button className="w-full bg-market-green text-paper font-semibold py-3 rounded-full hover:bg-market-green-light transition-colors">
              Register Interest
            </button>
          </>
        )}
      </form>
    </section>
  )
}

function EventOrderForm() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section id="events" className="bg-clay/10 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          className="bg-paper border-2 border-clay/20 rounded-3xl p-8 space-y-4 order-2 md:order-1"
        >
          {submitted ? (
            <p className="text-clay font-semibold">
              Thanks — placeholder confirmation. On the live site this lands straight in WhatsApp for a fast quote.
            </p>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium block mb-1">Event type</label>
                <input className="w-full rounded-xl border border-ink/15 px-4 py-2" placeholder="Wedding, funeral, church event..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Date</label>
                  <input type="date" className="w-full rounded-xl border border-ink/15 px-4 py-2" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Guests (approx.)</label>
                  <input className="w-full rounded-xl border border-ink/15 px-4 py-2" placeholder="150" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Delivery location</label>
                <input className="w-full rounded-xl border border-ink/15 px-4 py-2" placeholder="e.g. Kutus, Kerugoya..." />
              </div>
              <button className="w-full bg-clay text-paper font-semibold py-3 rounded-full hover:opacity-90 transition-opacity">
                Get a Quote
              </button>
            </>
          )}
        </form>
        <div className="order-1 md:order-2">
          <SectionEyebrow>Planning something?</SectionEyebrow>
          <h2 className="font-display font-700 text-4xl mb-4 text-market-green">
            Event & Party Orders
          </h2>
          <p className="text-ink/80 max-w-md">
            Weddings, funerals, church functions — get a fast, competitive
            quote on bulk supplies before you commit elsewhere. We deliver
            straight to the venue.
          </p>
        </div>
      </div>
    </section>
  )
}

function Loyalty() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <SectionEyebrow>Stay in the loop</SectionEyebrow>
      <h2 className="font-display font-700 text-4xl mb-4 text-market-green">Join Our Loyalty List</h2>
      <p className="text-ink/70 max-w-md mx-auto mb-8">
        Get first word on weekly offers and bulk deals, straight to WhatsApp.
      </p>
      {submitted ? (
        <p className="text-market-green font-semibold">You're on the list — placeholder confirmation.</p>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input className="flex-1 rounded-full border border-ink/15 px-5 py-3" placeholder="Your name" />
          <input className="flex-1 rounded-full border border-ink/15 px-5 py-3" placeholder="Phone number" />
          <button className="bg-market-green text-paper font-semibold px-6 py-3 rounded-full hover:bg-market-green-light transition-colors">
            Join
          </button>
        </form>
      )}
    </section>
  )
}

function LocationSection() {
  return (
    <section id="location" className="bg-market-green text-paper py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <SectionEyebrow><span className="text-marigold">Find us</span></SectionEyebrow>
          <h2 className="font-display font-700 text-4xl mb-6">Visit the Shop</h2>
          <ul className="space-y-3 text-paper/85">
            <li><strong className="text-marigold">Location:</strong> [Street / Town Name], Kerugoya</li>
            <li><strong className="text-marigold">Hours:</strong> Mon – Sun, 7:00am – 9:00pm</li>
            <li><strong className="text-marigold">Phone / WhatsApp:</strong> 07xx xxx xxx</li>
          </ul>
        </div>
        <div className="rounded-3xl overflow-hidden aspect-video bg-paper/10 flex items-center justify-center text-paper/50 text-sm">
          Map embed placeholder
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-paper/70 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Utawala Supermarket. Mock site — placeholder content.</p>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-marigold font-medium">
          Chat on WhatsApp →
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <Offers />
      <Categories />
      <DeliverySteps />
      <BulkOrderForm />
      <EventOrderForm />
      <Loyalty />
      <LocationSection />
      <Footer />
    </div>
  )
}
