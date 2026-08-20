import Nav from './components/Nav'
import Hero from './components/Hero'
import Offers from './components/Offers'
import Categories from './components/Categories'
import AwningDivider from './components/AwningDivider'
import BulkOrderForm from './components/BulkOrderForm'
import EventOrderForm from './components/EventOrderForm'
import Loyalty from './components/Loyalty'
import LocationSection from './components/LocationSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <Offers />
      <Categories />
      <AwningDivider />
      <BulkOrderForm />
      <EventOrderForm />
      <Loyalty />
      <LocationSection />
      <Footer />
    </div>
  )
}