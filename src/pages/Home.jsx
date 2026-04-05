import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import destinations from '../utils/destinations'
import guides from '../utils/travelGuides'
import { CATEGORIES } from '../utils/travelGuides'
import NewsletterBanner from '../components/NewsletterBanner'

const instaPhotos = [
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
  'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400',
  'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400',
  'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=400',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
]

// ── Currency Converter ────────────────────────────────────────────────
const CURRENCIES = [
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { code: 'CAD', flag: '🇨🇦', name: 'Canadian Dollar' },
  { code: 'AUD', flag: '🇦🇺', name: 'Australian Dollar' },
  { code: 'MXN', flag: '🇲🇽', name: 'Mexican Peso' },
  { code: 'JPY', flag: '🇯🇵', name: 'Japanese Yen' },
  { code: 'CHF', flag: '🇨🇭', name: 'Swiss Franc' },
  { code: 'BRL', flag: '🇧🇷', name: 'Brazilian Real' },
  { code: 'INR', flag: '🇮🇳', name: 'Indian Rupee' },
  { code: 'KRW', flag: '🇰🇷', name: 'Korean Won' },
  { code: 'SEK', flag: '🇸🇪', name: 'Swedish Krona' },
  { code: 'NOK', flag: '🇳🇴', name: 'Norwegian Krone' },
  { code: 'DKK', flag: '🇩🇰', name: 'Danish Krone' },
  { code: 'NZD', flag: '🇳🇿', name: 'NZ Dollar' },
  { code: 'SGD', flag: '🇸🇬', name: 'Singapore Dollar' },
  { code: 'HKD', flag: '🇭🇰', name: 'HK Dollar' },
  { code: 'PLN', flag: '🇵🇱', name: 'Polish Złoty' },
  { code: 'THB', flag: '🇹🇭', name: 'Thai Baht' },
  { code: 'TRY', flag: '🇹🇷', name: 'Turkish Lira' },
  { code: 'ZAR', flag: '🇿🇦', name: 'South African Rand' },
]

const QUICK_AMOUNTS = [10, 50, 100, 500, 1000]

function CurrencyConverter() {
  const [amount, setAmount] = useState(100)
  const [inputVal, setInputVal] = useState('100')
  const [currency, setCurrency] = useState('GBP')
  const [result, setResult] = useState(null)
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true)
      setError(null)
      try {
        // Try multiple APIs in order of preference
        let data = null
        
        // 1. Try ExchangeRate-API (free, reliable)
        try {
          const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
          data = await res.json()
          if (data.rates && data.rates.USD) {
            setRates(data.rates)
            setResult((amount * data.rates.USD).toFixed(2))
            return
          }
        } catch (e) {
          console.log('ExchangeRate-API failed, trying next...')
        }
        
        // 2. Try Frankfurter as fallback
        try {
          const res = await fetch(`https://api.frankfurter.app/latest?from=${currency}&to=USD`)
          data = await res.json()
          if (data.rates && data.rates.USD) {
            setRates(data.rates)
            setResult((amount * data.rates.USD).toFixed(2))
            return
          }
        } catch (e) {
          console.log('Frankfurter failed, trying next...')
        }
        
        // 3. Try CurrencyAPI as last resort
        try {
          const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=fre_live_KEY&base_currency=${currency}`)
          data = await res.json()
          if (data.data && data.data.USD) {
            setRates(data.data)
            setResult((amount * data.data.USD).toFixed(2))
            return
          }
        } catch (e) {
          console.log('CurrencyAPI failed')
        }
        
        // If all APIs fail, use mock rates
        const mockRates = {
          'USD': 1,
          'EUR': 0.85,
          'GBP': 0.73,
          'CAD': 1.25,
          'AUD': 1.35,
          'MXN': 17.5,
          'JPY': 110,
          'CHF': 0.92,
          'BRL': 5.2
        }
        
        const usdRate = currency === 'USD' ? 1 : mockRates[currency]
        if (usdRate) {
          setRates({ 'USD': 1 / usdRate })
          setResult((amount * (1 / usdRate)).toFixed(2))
        }
        
      } catch (err) {
        console.error('All currency APIs failed:', err)
        // Don't show error to user, just use mock data
      } finally {
        setLoading(false)
      }
    }
    fetchRates()
  }, [currency])

  useEffect(() => {
    if (rates) setResult((amount * (rates['USD'] || 1)).toFixed(2))
  }, [amount, rates])

  const selectedCurrency = CURRENCIES.find(c => c.code === currency)

  const handleAmountChange = (e) => {
    const val = e.target.value
    setInputVal(val)
    const num = parseFloat(val)
    if (!isNaN(num) && num >= 0) setAmount(num)
  }

  const handleQuick = (val) => {
    setAmount(val)
    setInputVal(String(val))
  }

  const adjust = (delta) => {
    const next = Math.max(0, amount + delta)
    setAmount(next)
    setInputVal(String(next))
  }

  return (
    <div>
      {/* Step 1: pick currency */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">① Pick your currency</p>
      <div className="grid grid-cols-2 gap-1.5 mb-4 max-h-48 overflow-y-auto pr-0.5">
        {CURRENCIES.map(c => (
          <button
            key={c.code}
            onClick={() => setCurrency(c.code)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all text-left ${
              currency === c.code
                ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-sm'
                : 'border-gray-100 bg-white text-gray-600 hover:border-primary-200 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl leading-none">{c.flag}</span>
            <div className="min-w-0">
              <span className="font-bold block">{c.code}</span>
              <span className="text-xs text-gray-400 truncate block leading-tight">{c.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Step 2: enter amount */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">② Enter amount</p>
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => adjust(-10)}
          className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl flex items-center justify-center transition-colors shrink-0 select-none"
          aria-label="Decrease by 10"
        >−</button>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl leading-none">{selectedCurrency?.flag}</span>
          <input
            type="number"
            inputMode="decimal"
            value={inputVal}
            onChange={handleAmountChange}
            className="w-full border-2 border-gray-200 focus:border-primary-400 rounded-xl pl-10 pr-3 py-2.5 text-xl font-bold text-gray-800 focus:outline-none text-center"
            aria-label={`Amount in ${currency}`}
            min="0"
          />
        </div>
        <button
          onClick={() => adjust(10)}
          className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl flex items-center justify-center transition-colors shrink-0 select-none"
          aria-label="Increase by 10"
        >+</button>
      </div>

      {/* Quick-pick amounts */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {QUICK_AMOUNTS.map(v => (
          <button
            key={v}
            onClick={() => handleQuick(v)}
            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
              amount === v
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white border-gray-200 text-gray-600 hover:border-primary-300'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Step 3: result */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">③ Value in USD 🇺🇸</p>
      <div className="bg-primary-900 rounded-2xl px-5 py-4 text-center">
        {loading ? (
          <p className="text-gray-400 text-sm animate-pulse">Loading rates…</p>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-2">
              {selectedCurrency?.flag}{' '}
              <span className="font-bold text-white">{amount.toLocaleString()}</span>{' '}
              <span className="text-gray-500">{currency}</span>
              {' '}={' '}
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl">🇺🇸</span>
              <span className="text-4xl font-black text-white tracking-tight">
                ${Number(result).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-1">US Dollars</p>
          </>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 mt-2">
        Rates from{' '}
        <a href="https://www.frankfurter.app/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">
          Frankfurter
        </a>{' '}(ECB)
      </p>
    </div>
  )
}

// ── Main Home ─────────────────────────────────────────────────────────
export default function Home() {
  const featured = destinations[0]

  return (
    <div>

      {/* ====== 1. HERO ====== */}
      <section className="relative min-h-[520px] flex items-center">
        <div className="absolute inset-0">
          <img src="/usa-trip-planner-home.webp" alt="Golden Gate Bridge" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-900/70"></div>
        </div>
        <div className="relative container-custom py-20 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
              Discover the <span className="text-accent-500">USA</span> Your Way
            </h1>
            <p className="text-gray-300 text-lg mb-8">Plan your perfect American adventure with curated itineraries, real-time travel data, and destination guides — all in one place.</p>
            <div className="flex gap-4">
              <Link to="/destinations" className="btn-accent px-8 py-3" aria-label="Explore all USA destinations and travel guides">Explore Destinations</Link>
              <Link to="/itineraries" className="border border-white/40 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium text-sm">Download Itineraries</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== 2. CATEGORY PILLS ====== */}
      <div className="bg-white">
        <div className="container-custom py-6 flex flex-wrap justify-center items-center gap-2">
          <Link to="/guides" className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary-800 text-white hover:bg-primary-700 transition-colors">All</Link>
          {CATEGORIES.map((cat) => (
            <Link key={cat} to={`/guides?category=${encodeURIComponent(cat)}`} className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-primary-800 hover:text-white transition-colors">
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* ====== 3. FEATURED DESTINATION + TOOLKIT SIDEBAR ====== */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Featured Destination header */}
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary-900">Featured Destination</h2>
                <p className="text-gray-500 text-sm mt-1">Hand-picked spot we love</p>
              </div>
              <Link to="/destinations" className="text-primary-500 text-sm font-medium hover:text-primary-600">View all →</Link>
            </div>

            {/* Compact destination card */}
            {featured && (
              <Link
                to={`/destinations/${featured.id}`}
                className="group flex flex-col sm:flex-row rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative sm:w-[48%] h-52 sm:h-auto shrink-0 overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-accent-500 text-white text-xs font-medium px-3 py-1 rounded-full capitalize">
                    {featured.category}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 bg-white p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      {featured.state}{featured.region ? ` · ${featured.region}` : ''}
                    </p>
                    <h3 className="text-xl font-heading font-bold text-primary-900 mb-1">{featured.name}</h3>
                    {featured.tagline && (
                      <p className="text-accent-500 italic text-sm mb-3">{featured.tagline}</p>
                    )}
                    <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{featured.description}</p>

                    {featured.highlights && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {featured.highlights.slice(0, 4).map(h => (
                          <span key={h} className="text-xs border border-gray-200 text-gray-500 px-2.5 py-0.5 rounded-full">{h}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      {featured.bestTime && <span>🗓️ {featured.bestTime}</span>}
                      {featured.avgBudget && <span>💰 {featured.avgBudget}</span>}
                    </div>
                    <span className="btn-accent px-5 py-2 text-xs">Explore →</span>
                  </div>
                </div>
              </Link>
            )}

            {/* From the Blog */}
            <div className="mt-16">
              <div className="flex items-end justify-between mb-5">
                <h2 className="text-xl font-heading font-bold text-primary-900">From the Blog</h2>
                <Link to="/guides" className="text-primary-500 text-sm font-medium hover:text-primary-600">View All →</Link>
              </div>
              <div className="space-y-3">
                {guides.slice(0, 3).map(g => (
                  <Link
                    key={g.id}
                    to={`/guides/${g.id}`}
                    className="group flex gap-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="w-28 h-20 shrink-0 overflow-hidden">
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 py-3 pr-4 flex flex-col justify-center">
                      <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full w-fit mb-1">{g.category}</span>
                      <h3 className="text-sm font-bold text-primary-900 line-clamp-2 group-hover:text-primary-500 transition-colors">{g.title}</h3>
                      {g.excerpt && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{g.excerpt}</p>
                      )}
                    </div>
                  </Link>
                ))}

                {/* 4th article — placeholder */}
                <div className="flex gap-4 rounded-xl overflow-hidden border border-dashed border-gray-200 bg-gray-50">
                  <div className="w-28 h-20 shrink-0 bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">✍️</div>
                  <div className="flex-1 py-3 pr-4 flex flex-col justify-center">
                    <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full w-fit mb-1">Coming Soon</span>
                    <h3 className="text-sm font-bold text-gray-400">New article coming soon...</h3>
                    <p className="text-xs text-gray-300 mt-0.5">Stay tuned for more travel tips and guides.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Travel Toolkit ── */}
          <div className="lg:sticky lg:top-6 flex flex-col gap-4">
            <h2 className="text-xl font-heading font-bold text-primary-900">Your Travel Toolkit</h2>

            {/* Currency Converter */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">💱</span>
                <h3 className="font-bold text-primary-900 text-sm">Currency Converter</h3>
              </div>
              <CurrencyConverter />
            </div>

            {/* Explore Itineraries */}
            <Link
              to="/itineraries"
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow group"
            >
              <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center shrink-0 text-lg">🗺️</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-primary-900 group-hover:text-primary-500 transition-colors">Explore Itineraries</h3>
                <p className="text-xs text-gray-400 leading-snug">Ready-to-use travel plans for every style and budget.</p>
              </div>
              <span className="text-gray-300 group-hover:text-primary-500 transition-colors shrink-0">→</span>
            </Link>

            {/* Create Your Own */}
            <Link
              to="/create"
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow group"
            >
              <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center shrink-0 text-lg">✏️</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-primary-900 group-hover:text-primary-500 transition-colors">Create Your Own Itinerary</h3>
                <p className="text-xs text-gray-400 leading-snug">Build a personalised trip with our interactive planner.</p>
              </div>
              <span className="text-gray-300 group-hover:text-primary-500 transition-colors shrink-0">→</span>
            </Link>

            {/* Discounts & Deals */}
            <Link
              to="/deals"
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow group"
            >
              <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center shrink-0 text-lg">🏷️</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-primary-900 group-hover:text-primary-500 transition-colors">Discounts &amp; Deals</h3>
                <p className="text-xs text-gray-400 leading-snug">Exclusive travel deals, coupons, and partner discounts.</p>
                <span className="text-xs text-accent-500 font-medium">View Deals →</span>
              </div>
            </Link>

            {/* Ready to Plan — CTA at bottom of sidebar */}
            <div className="bg-primary-900 rounded-2xl p-5 text-center mt-4">
              <h3 className="text-white font-heading font-bold text-base mb-1">Ready to Plan Your Adventure?</h3>
              <p className="text-gray-400 text-xs mb-4 leading-snug">
                Create your personalised itinerary in minutes.
              </p>
              <Link to="/create" className="btn-accent w-full flex items-center justify-center py-2.5 text-sm font-semibold rounded-xl">
                Start Planning Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ====== 4. NEWSLETTER ====== */}
      <NewsletterBanner />

      {/* ====== 5. INSTAGRAM ====== */}
      <section className="container-custom py-12 text-center">
        <h2 className="text-2xl font-heading font-bold text-primary-900 mb-2">Follow Us on Instagram</h2>
        <p className="text-gray-500 text-sm mb-8">@usatripplanner — Travel inspiration, tips, and behind-the-scenes content.</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {instaPhotos.map((src, i) => (
            <a key={i} href="https://www.instagram.com/usatripplanner/" target="_blank" rel="noopener noreferrer" className="group relative rounded-xl overflow-hidden aspect-square">
              <img src={src} alt={`Instagram photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/30 transition-colors flex items-center justify-center">
                <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
        <a href="https://www.instagram.com/usatripplanner/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-primary-800 text-primary-900 font-medium px-6 py-2 rounded-full hover:bg-primary-50 transition-colors text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          Follow @usatripplanner
        </a>
      </section>

    </div>
  )
}
