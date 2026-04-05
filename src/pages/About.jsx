import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function About() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <div>
      {/* Skip Navigation */}
      <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
      
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="/usa-trip-planner-about.webp"
          alt="About hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary-900 mb-4">
            About USA Trip Planner
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
            Your trusted companion for exploring the United States. Discover curated itineraries, destination guides, and insider tips for unforgettable American adventures.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" role="main" aria-label="About USA Trip Planner content">
        <div className="container-custom py-16">

          {/* What We Do */}
          <section className="mb-16" aria-labelledby="what-we-do-heading">
            <h2 id="what-we-do-heading" className="font-heading font-bold text-2xl text-primary-900 mb-8 text-center">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Curate Experiences */}
              <article className="bg-primary-900 text-white p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Map pin / destination icon */}
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Curate Experiences</h3>
                <p className="text-gray-300">
                  Hand-picked itineraries from local experts who know the USA inside and out.
                </p>
              </article>

              {/* Inspire Travel */}
              <article className="bg-primary-900 text-white p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Compass icon */}
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Inspire Travel</h3>
                <p className="text-gray-300">
                  Beautiful destinations, practical tips, and authentic stories that spark wanderlust.
                </p>
              </article>

              {/* Plan Perfectly */}
              <article className="bg-primary-900 text-white p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Calendar / itinerary icon */}
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Plan Perfectly</h3>
                <p className="text-gray-300">
                  Smart tools and seamless booking to turn your travel dreams into reality.
                </p>
              </article>

            </div>
          </section>

          {/* Our Story */}
          <section className="mb-16" aria-labelledby="our-story-heading">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop"
                  alt="Our team"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 id="our-story-heading" className="font-heading font-bold text-3xl text-primary-900 mb-6">
                  About USA Trip Planner
                </h2>
                <div className="prose prose-lg text-gray-600 mb-8">
                  <p className="mb-4">
                    Founded in 2024, USA Trip Planner emerged from a simple idea: make exploring America accessible, exciting, and unforgettable for everyone. We believe that travel should be about discovery, not just destinations.
                  </p>
                  <p className="mb-4">
                    Our platform combines cutting-edge technology with local expertise to deliver personalized itineraries that match your travel style, budget, and interests. Whether you're seeking adventure, relaxation, or cultural immersion, we've got you covered.
                  </p>
                  <p>
                    Join thousands of travelers who trust us to transform their American travel dreams into reality. From the bustling streets of New York to the serene landscapes of Yellowstone, every journey tells a story worth sharing.
                  </p>
                </div>

                <div className="bg-accent-50 rounded-xl p-6 mb-8">
                  <h3 className="font-heading font-bold text-xl text-primary-900 mb-4">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Expert-curated content from local travelers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Interactive planning tools and smart recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Real-time updates and 24/7 customer support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Free to use with no hidden fees</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/destinations"
                  className="inline-flex items-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-accent-600 transition-colors"
                  aria-label="Explore destinations"
                >
                  Start Exploring
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="bg-primary-900 text-white py-16 rounded-2xl" aria-labelledby="newsletter-heading">
            <div className="max-w-2xl mx-auto text-center px-6">
              <h2 id="newsletter-heading" className="font-heading font-bold text-2xl mb-4">
                Stay Inspired
              </h2>
              <p className="text-gray-300 mb-8">
                Get the best USA travel tips, destination guides, and exclusive deals delivered straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto" noValidate>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="about-email" className="sr-only">Email address for newsletter</label>
                    <input
                      id="about-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      aria-label="Email address for newsletter"
                      aria-describedby="newsletter-help"
                      className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="about-submit" className="sr-only">Subscribe to newsletter</label>
                    <button
                      id="about-submit"
                      type="submit"
                      className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3.5 rounded-full text-base font-medium transition-colors"
                      aria-label="Subscribe to newsletter"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                <p id="newsletter-help" className="sr-only">
                  Enter your email address to receive USA travel tips, destination guides, and exclusive deals.
                </p>
              </form>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
