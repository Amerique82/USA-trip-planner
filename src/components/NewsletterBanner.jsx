import { useState } from 'react'
import { generateId } from '../utils/accessibility.jsx'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

  // Generate unique IDs for accessibility
  const emailId = generateId('newsletter-email')
  const submitId = generateId('newsletter-submit')

  return (
    <section className="bg-primary-900">
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">

          <p className="text-accent-400 text-xs font-semibold uppercase tracking-widest mb-3">Stay Inspired</p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
            Get Best of USA Delivered to Your Inbox
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
            Travel tips, destination guides, exclusive deals, and curated itineraries — straight to your inbox, no spam ever.
          </p>

          {subscribed ? (
            <div className="bg-white/10 rounded-2xl px-8 py-6">
              <p className="text-white font-semibold text-base">You're on the list!</p>
              <p className="text-gray-400 text-sm mt-1">Thanks for subscribing. Great adventures ahead.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
              <div className="relative">
                <label htmlFor={emailId} className="sr-only">Email address for newsletter</label>
                <input
                  id={emailId}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address for newsletter"
                  aria-describedby="newsletter-help"
                  className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3.5 pr-36 text-white placeholder-gray-300 focus:outline-none focus:border-accent-400 transition-colors"
                />
              </div>
              <button
                id={submitId}
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 btn-accent px-5 py-2 text-sm font-semibold rounded-full whitespace-nowrap"
              >
                Subscribe →
              </button>
              <p id="newsletter-help" className="sr-only">
                Enter your email address to subscribe to our newsletter for travel tips, destination guides, exclusive deals, and curated itineraries.
              </p>
            </form>
          )}

          <p className="text-gray-500 text-xs mt-4">
            No spam, ever. Unsubscribe at any Time. We respect your privacy.
          </p>

        </div>
      </div>
    </section>
  )
}
