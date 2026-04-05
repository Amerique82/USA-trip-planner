import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { filterGuides, getGuideCategories, getGuideTags } from '../utils/travelGuides'

const CATEGORIES = getGuideCategories()
const TAGS = getGuideTags()

export default function TravelGuides() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')
  const [activeTags, setActiveTags] = useState([])

  useEffect(() => {
    const cat = searchParams.get('category')
    setActiveCategory(cat || '')
  }, [searchParams])

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearAll = () => {
    setSearch('')
    setActiveCategory('')
    setActiveTags([])
  }

  const hasFilters = search || activeCategory || activeTags.length > 0
  const results = filterGuides({ search, category: activeCategory, tags: activeTags })
  const featured = results.length > 0 ? results[0] : null
  const rest = results.length > 1 ? results.slice(1) : []

  return (
    <div>
      {/* Hero — travel-relevant image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="/usa-trip-planner-blog.webp"
          alt="Road trip through America"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-900/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
            Travel Stories & Guides
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl leading-relaxed">
            Helping you plan smarter, travel deeper, and make the most of every trip to the United States — whether it's your first visit or your tenth.
          </p>
        </div>
      </div>

      <div className="container-custom py-14">

        {/* ── Results ── */}
        {results.length > 0 ? (
          <div>
            {/* Featured article — full width, FIRST */}
            {featured && (
              <Link
                to={`/guides/${featured.id}`}
                className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow mb-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-80 overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="bg-white p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs bg-accent-500 text-white px-3 py-1 rounded-full font-medium">Featured</span>
                      <span className="text-xs bg-primary-50 text-primary-600 px-3 py-1 rounded-full font-medium">{featured.category}</span>
                      <span className="text-xs text-gray-400">{featured.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-6">{featured.excerpt}</p>
                    <span className="text-primary-500 font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read article <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* CATEGORY FILTER BAR */}
            <div className="mt-8 mb-8 flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-400 mr-2">Browse by:</span>
              
              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === ''
                      ? 'bg-primary-900 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700 shadow-sm'
                  }`}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-primary-900 text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700 shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Rest of articles — horizontal cards in 2-column grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rest.map((g) => (
                  <Link
                    key={g.id}
                    to={`/guides/${g.id}`}
                    className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md transition-all duration-200 group"
                  >
                    {/* LEFT: Image */}
                    <div className="w-28 h-24 overflow-hidden rounded-lg shrink-0">
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* RIGHT: Content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400 mb-1">
                        {g.category} · {g.readTime}
                      </div>
                      <h3 className="font-heading font-bold text-primary-900 text-sm leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {g.title}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mt-1">{g.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">No articles found</p>
            <p className="text-sm">
              Try adjusting your filters or{' '}
              <button onClick={clearAll} className="text-primary-500 underline">clear all</button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
