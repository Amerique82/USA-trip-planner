import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function DestinationCard({ destination }) {
  const { isFavourite, toggleFavourite } = useAppContext()
  const liked = isFavourite(destination.id)

  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 block"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        {/* Gradient overlay at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-900 text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {destination.category}
        </span>

        {/* Favourite button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavourite(destination.id) }}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
        >
          <svg className={`h-4 w-4 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill={liked ? 'currentColor' : 'none'}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Destination name on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-heading font-bold text-white text-xl drop-shadow-md">{destination.name}</h3>
          <p className="text-white/80 text-xs mt-0.5 drop-shadow-sm">{destination.state} · {destination.region}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{destination.tagline}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-600">
            {destination.avgBudget && <span>{destination.avgBudget}</span>}
            {destination.duration && <span>· {destination.duration}</span>}
          </div>
          <span className="text-accent-700 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 underline">
            Explore <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
