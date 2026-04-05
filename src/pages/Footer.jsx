import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="bg-primary-900 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr] gap-10">
          {/* Brand — logo only, no text */}
          <div>
            <Link to="/" className="block mb-4">
              <img src="/usa_trip_planner_white_logo.webp" alt="USA Trip Planner" className="h-10 w-auto" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Discover beauty of the United States — from sun-kissed beaches to snow-capped mountains, every journey tells a story.
            </p>
          </div>

          {/* Explore — all pages */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gray-400">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-500 hover:text-accent-400 transition-colors">Home</Link></li>
              <li><Link to="/destinations" className="text-gray-500 hover:text-accent-400 transition-colors">Destinations</Link></li>
              <li><Link to="/guides" className="text-gray-500 hover:text-accent-400 transition-colors">Blog</Link></li>
              <li><Link to="/itineraries" className="text-gray-500 hover:text-accent-400 transition-colors">Itineraries</Link></li>
              <li><Link to="/create" className="text-gray-500 hover:text-accent-400 transition-colors">Create Yours</Link></li>
              <li><Link to="/deals" className="text-gray-500 hover:text-accent-400 transition-colors">Deals</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-accent-400 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gray-400">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                </svg>
                hello@usatripplanner.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Somewhere in the USA
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white hover:text-white hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/usatripplanner/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white hover:text-white hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white hover:text-white hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gray-300">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Get travel tips and destination guides delivered to your inbox.</p>
            {subscribed ? (
              <p className="text-green-400 text-sm">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" required className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-500" />
                <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-3 py-2 rounded-r-lg transition-colors" aria-label="Subscribe">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-300">
          <p>&copy; {new Date().getFullYear()} USA Trip Planner. All rights reserved. &middot; <Link to="/privacy" className="text-gray-300 hover:text-accent-400 transition-colors">Privacy Policy</Link> &middot; <Link to="/cookies" className="text-gray-300 hover:text-accent-400 transition-colors">Cookie Policy</Link></p>
        </div>
      </div>
    </footer>
  )
}
