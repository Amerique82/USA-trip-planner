import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchFilter from '../components/SearchFilter'
import { filterItineraries, getTypes, getRegions, getDurations } from '../utils/itineraries'

export default function Itineraries() {
  const [filters, setFilters] = useState({ search: '', type: '', region: '', duration: '' })
  const results = filterItineraries(filters)

  // Mock star ratings (in real app, this would come from data)
  const getStarRating = () => {
    const ratings = [4.5, 4.8, 4.2, 4.9, 4.6]
    return ratings[Math.floor(Math.random() * ratings.length)]
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : star === Math.ceil(rating) && rating % 1 !== 0
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 fill-current'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating}</span>
      </div>
    )
  }

  return (
    <div>
      {/* Hero - unchanged */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/usa-trip-planner-itineraries.webp" alt="Itineraries hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary-900 mb-3">Itineraries</h1>
          <p className="text-primary-800 text-sm md:text-base max-w-xl">Curated day-by-day travel plans across the USA.</p>
        </div>
      </div>
      
      <div className="container-custom py-10">
        {/* Enhanced Filter Bar */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Search itineraries..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
              />
            </div>

            {/* Travel Style Dropdown */}
            <div>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
              >
                <option value="">Travel Style</option>
                {getTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Region Dropdown */}
            <div>
              <select
                value={filters.region}
                onChange={(e) => setFilters({...filters, region: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
              >
                <option value="">Region</option>
                {getRegions().map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Duration Dropdown */}
            <div>
              <select
                value={filters.duration}
                onChange={(e) => setFilters({...filters, duration: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
              >
                <option value="">Duration</option>
                {getDurations().map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map(i => (
              <div key={i.id} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-5 items-center hover:shadow-md transition-shadow">
                {/* LEFT: Image thumbnail */}
                <div className="overflow-hidden rounded-lg shrink-0">
                  <img 
                    src={i.image} 
                    alt={i.title} 
                    className="w-32 h-24 object-cover" 
                    loading="lazy" 
                  />
                </div>

                {/* MIDDLE: All info stacked */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="font-heading font-bold text-primary-900 text-lg mb-1">{i.title}</h3>
                  
                  {/* Duration and region */}
                  <p className="text-sm text-gray-400 mb-2">
                    {i.duration} · {i.region}
                  </p>
                  
                  {/* Tags row */}
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full capitalize">
                      {i.type}
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="mb-2">
                    {renderStars(getStarRating())}
                  </div>
                  
                  {/* Day preview line */}
                  {i.days && (
                    <p className="text-sm text-gray-500">
                      {i.days.map((day, index) => (
                        <span key={day.day}>
                          Day {day.day}: {day.title}{index < i.days.length - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                {/* RIGHT: View button */}
                <div className="shrink-0 flex flex-col gap-2 items-end justify-center ml-4">
                  <Link 
                    to={`/itineraries/${i.id}`} 
                    className="inline-flex items-center gap-1 bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors shrink-0"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p>No itineraries found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
