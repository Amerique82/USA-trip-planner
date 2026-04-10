import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-sand px-6 py-24">
      <div className="text-center max-w-xl">

        {/* Big 404 */}
        <div
          className="text-[clamp(120px,20vw,200px)] font-heading font-bold leading-none text-primary-900 opacity-10 mb-[-30px]"
          aria-hidden="true"
        >
          404
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" fill="none" width="72" height="72">
            <circle cx="36" cy="36" r="34" stroke="#1a2d8a" stroke-width="1.5" opacity="0.15"/>
            <path d="M20 52 L28 28 L36 40 L44 24 L52 52" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <circle cx="36" cy="40" r="2.5" fill="#f97316"/>
            <circle cx="44" cy="24" r="2.5" fill="#1a2d8a"/>
            <line x1="16" y1="56" x2="56" y2="56" stroke="#1a2d8a" stroke-width="1.5" stroke-linecap="round" opacity="0.2"/>
          </svg>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
          Looks like you took a wrong turn
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have been moved.
          No worries — there's still plenty of America left to explore.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="bg-accent-500 hover:bg-accent-600 text-white font-heading font-bold px-8 py-3 rounded-full transition-colors duration-200"
          >
            Back to Home
          </Link>
          <Link
            to="/destinations"
            className="border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white font-heading font-bold px-8 py-3 rounded-full transition-colors duration-200"
          >
            Explore Destinations
          </Link>
        </div>

      </div>
    </section>
  )
}
