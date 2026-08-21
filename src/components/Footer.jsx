import { WHATSAPP_NUMBER } from '../config'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Utawala Supermarket. All rights reserved.</p>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-marigold font-medium">
          Chat on WhatsApp →
        </a>
      </div>
    </footer>
  )
}