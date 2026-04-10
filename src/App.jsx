import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Itineraries from './pages/Itineraries'
import ItineraryDetail from './pages/ItineraryDetail'
import TravelGuides from './pages/TravelGuides'
import GuideDetail from './pages/GuideDetail'
import CreateItinerary from './pages/CreateItinerary'
import Deals from './pages/Deals'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CookiePolicy from './pages/CookiePolicy'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSkipNavigation } from './utils/accessibility.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { 
    // Small delay to ensure content is rendered
    setTimeout(() => {
      window.scrollTo(0, 0) 
    }, 0)
  }, [pathname])
  return null
}

function AppLayout() {
  const { SkipLink } = useSkipNavigation()

  useEffect(() => {
    // Set page title based on route
    const titles = {
      '/': 'USA Trip Planner | Dream · Plan · Travel',
      '/destinations': 'Destinations | USA Trip Planner',
      '/itineraries': 'Itineraries | USA Trip Planner',
      '/guides': 'Travel Guides | USA Trip Planner',
      '/create': 'Create Itinerary | USA Trip Planner',
      '/deals': 'Travel Deals | USA Trip Planner',
      '/about': 'About Us | USA Trip Planner',
      '/contact': 'Contact | USA Trip Planner',
      '/privacy': 'Privacy Policy | USA Trip Planner',
      '/cookies': 'Cookie Policy | USA Trip Planner'
    }
    
    const currentPath = window.location.pathname
    const baseTitle = titles[currentPath] || 'USA Trip Planner | Dream · Plan · Travel'
    document.title = baseTitle
  }, [])

  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/itineraries/:id" element={<ItineraryDetail />} />
            <Route path="/guides" element={<TravelGuides />} />
            <Route path="/guides/:id" element={<GuideDetail />} />
            <Route path="/create" element={<CreateItinerary />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </>
  )
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  )
}

export default App
