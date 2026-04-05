import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [toolkitOpen, setToolkitOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolkitOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const lnk = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-accent-500 border-b-2 border-accent-500 pb-1' : 'text-white hover:text-accent-400'}`

  const mob = 'block px-3 py-2 text-white hover:text-accent-400 hover:bg-white/10 rounded-md text-sm'

  const toolkitLinks = [
    { to: '/itineraries', label: 'Itineraries' },
    { to: '/create', label: 'Create Yours' },
    { to: '/deals', label: 'Deals' },
  ]

  return (
    <nav className="bg-primary-900 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/">
            <img src="/usa-trip-planner-white-logo.webp" alt="USA Trip Planner" className="h-14 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={lnk} end>Home</NavLink>
            <NavLink to="/destinations" className={lnk}>Destinations</NavLink>
            <NavLink to="/guides" className={lnk}>Blog</NavLink>

            {/* Toolkit dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolkitOpen(v => !v)}
                className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${toolkitOpen ? 'text-accent-500' : 'text-white hover:text-accent-400'}`}
              >
                Toolkit
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${toolkitOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {toolkitOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                  {/* Arrow */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                  {toolkitLinks.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setToolkitOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/about" className={lnk}>About</NavLink>
            <NavLink to="/contact" className={lnk}>Contact Us</NavLink>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-1">
            <NavLink to="/" className={mob} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/destinations" className={mob} onClick={() => setOpen(false)}>Destinations</NavLink>
            <NavLink to="/guides" className={mob} onClick={() => setOpen(false)}>Blog</NavLink>
            <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Toolkit</div>
            {toolkitLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={`${mob} pl-6`} onClick={() => setOpen(false)}>{label}</NavLink>
            ))}
            <NavLink to="/about" className={mob} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={mob} onClick={() => setOpen(false)}>Contact Us</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}
