import { WHATSAPP_NUMBER } from '../config'
import logo from '../assets/logo-full.svg'


export default function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center">
  <img src={logo} alt="Utawala Supermarket" className="h-14" />
</a>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#offers" className="hover:text-clay transition-colors">Offers</a>
          <a href="#bulk" className="hover:text-clay transition-colors">Bulk Orders</a>
          <a href="#events" className="hover:text-clay transition-colors">Events</a>
          <a href="#location" className="hover:text-clay transition-colors">Visit Us</a>
        </nav>
        
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`}
          className="bg-market-green text-paper text-sm font-semibold px-4 py-2 rounded-full hover:bg-market-green-light transition-colors"
        >
          Order on WhatsApp
        </a>
      </div>
    </header>
  )
}