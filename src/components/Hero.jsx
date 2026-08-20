import { WHATSAPP_NUMBER } from '../config'
import { StampBadge } from './Shared'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-gradient-bg absolute inset-0 -z-10" />
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-20 grid md:grid-cols-2 gap-10 items-center">
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
            Utawala Supermarket — your neighbourhood shop in Kerugoya Town
            for groceries, household essentials and fresh produce, with
            delivery and bulk orders sorted over WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="bg-clay text-paper font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Order for Delivery
            </a>
            
              <a href="#location"
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
      </div>
    </section>
  )
}