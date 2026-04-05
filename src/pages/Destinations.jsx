import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as d3 from 'd3'
import { filterDestinations, getRegions } from '../utils/destinations'
import { useAnnouncer, useSkipNavigation, generateId } from '../utils/accessibility.jsx'
import topoData from '../../public/us-states.json'

const DESTINATION_TYPES = ['Beach', 'City', 'Mountain', 'Entertainment', 'Culture']

const STATE_TO_REGION = {
  'Washington': 'West Coast', 'Oregon': 'West Coast', 'California': 'West Coast',
  'Arizona': 'Southwest', 'New Mexico': 'Southwest', 'Nevada': 'Southwest',
  'Utah': 'Southwest', 'Colorado': 'Southwest', 'Idaho': 'Southwest',
  'Montana': 'Midwest', 'Wyoming': 'Midwest', 'North Dakota': 'Midwest',
  'South Dakota': 'Midwest', 'Nebraska': 'Midwest', 'Kansas': 'Midwest',
  'Minnesota': 'Midwest', 'Iowa': 'Midwest', 'Missouri': 'Midwest',
  'Wisconsin': 'Midwest', 'Michigan': 'Midwest', 'Illinois': 'Midwest',
  'Indiana': 'Midwest', 'Ohio': 'Midwest',
  'Texas': 'South', 'Oklahoma': 'South', 'Arkansas': 'South', 'Louisiana': 'South',
  'Mississippi': 'South', 'Alabama': 'South', 'Tennessee': 'South', 'Kentucky': 'South',
  'West Virginia': 'South', 'Virginia': 'South', 'North Carolina': 'South',
  'South Carolina': 'South', 'Georgia': 'South', 'Florida': 'South',
  'Maine': 'East Coast', 'New Hampshire': 'East Coast', 'Vermont': 'East Coast',
  'Massachusetts': 'East Coast', 'Rhode Island': 'East Coast', 'Connecticut': 'East Coast',
  'New York': 'East Coast', 'New Jersey': 'East Coast', 'Pennsylvania': 'East Coast',
  'Delaware': 'East Coast', 'Maryland': 'East Coast', 'District of Columbia': 'East Coast',
}

const EXCLUDE = new Set([
  'Alaska', 'Hawaii', 'Puerto Rico', 'American Samoa',
  'United States Virgin Islands', 'Guam',
  'Commonwealth of the Northern Mariana Islands'
])

// ── USA MAP ───────────────────────────────────────────────────────────────────
function USAMap({ selectedRegion, onRegionSelect, destinationCounts }) {
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [tooltip, setTooltip]             = useState(null)
  const [paths, setPaths]                 = useState([])
  const [labels, setLabels]               = useState([])
  const svgRef = useRef(null)

  useEffect(() => {
    import('topojson-client').then(({ feature }) => {
      const W = 760, H = 440
      const geo = feature(topoData, topoData.objects.states)
      const continental = {
        ...geo,
        features: geo.features.filter(f => !EXCLUDE.has(f.properties.name))
      }
      const projection = d3.geoAlbersUsa().fitSize([W, H], continental)
      const pathGen    = d3.geoPath().projection(projection)

      const built = continental.features.map(f => ({
        name:     f.properties.name,
        region:   STATE_TO_REGION[f.properties.name] || null,
        d:        pathGen(f),
        centroid: pathGen.centroid(f),
      }))
      setPaths(built)

      // Region label positions = average centroid of member states
      const acc = {}
      built.forEach(({ region, centroid }) => {
        if (!region || isNaN(centroid[0])) return
        if (!acc[region]) acc[region] = { xs: [], ys: [] }
        acc[region].xs.push(centroid[0])
        acc[region].ys.push(centroid[1])
      })
      setLabels(
        Object.entries(acc).map(([region, { xs, ys }]) => ({
          region,
          x: xs.reduce((a,b)=>a+b,0)/xs.length,
          y: ys.reduce((a,b)=>a+b,0)/ys.length,
        }))
      )
    })
  }, [])

  const handleMouseMove = (e, region) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      region,
      count: destinationCounts[region] || 0,
    })
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ background: '#0f1c2e' }}
    >
      {/* Map header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <span style={{
          fontSize: 10,
          letterSpacing: '0.14em',
          color: '#3a5a78',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>
          Interactive Map
        </span>
        {selectedRegion && (
          <button
            onClick={() => onRegionSelect('')}
            style={{
              fontSize: 11,
              color: '#f97316',
              letterSpacing: '0.04em',
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.3)',
              borderRadius: 20,
              padding: '2px 10px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            ✕ {selectedRegion}
          </button>
        )}
      </div>

      {/* SVG */}
      <div className="relative px-3 pb-2">
        <svg
          ref={svgRef}
          viewBox="0 0 760 440"
          style={{ display: 'block', width: '100%' }}
          aria-label="Interactive USA map"
        >
          <defs>
            <filter id="orange-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="white-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {paths.map(({ name, region, d }) => {
            if (!d) return null
            const sel = selectedRegion === region
            const hov = hoveredRegion  === region
            return (
              <path
                key={name}
                d={d}
                fill={
                  sel ? '#f97316'
                  : hov ? '#fed7aa'
                  : '#e8eef4'
                }
                stroke={
                  sel ? '#ea580c'
                  : hov ? '#fb923c'
                  : '#0f1c2e'
                }
                strokeWidth={sel ? 1 : hov ? 0.8 : 0.5}
                style={{
                  cursor: region ? 'pointer' : 'default',
                  transition: 'fill 0.15s ease, stroke 0.15s ease',
                  filter: sel ? 'url(#orange-glow)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!region) return
                  setHoveredRegion(region)
                  handleMouseMove(e, region)
                }}
                onMouseMove={(e) => {
                  if (!region) return
                  handleMouseMove(e, region)
                }}
                onMouseLeave={() => {
                  setHoveredRegion(null)
                  setTooltip(null)
                }}
                onClick={() => region && onRegionSelect(region === selectedRegion ? '' : region)}
              />
            )
          })}

          {/* Region labels */}
          {labels.map(({ region, x, y }) => {
            const sel = selectedRegion === region
            const hov = hoveredRegion  === region
            return (
              <text
                key={region}
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8.5"
                fontWeight={sel || hov ? '700' : '500'}
                letterSpacing="0.10em"
                fill={sel ? '#7c2d12' : hov ? '#9a3412' : '#64748b'}
                style={{
                  pointerEvents: 'none',
                  transition: 'fill 0.15s',
                  fontFamily: 'inherit',
                  textTransform: 'uppercase',
                }}
              >
                {region.toUpperCase()}
              </text>
            )
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              position: 'absolute',
              left: tooltip.x + 14,
              top:  tooltip.y - 36,
              background: '#0f1c2e',
              border: '1px solid rgba(249,115,22,0.4)',
              borderRadius: 8,
              padding: '6px 12px',
              pointerEvents: 'none',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ color: '#f97316', fontSize: 12, fontWeight: 700 }}>
              {tooltip.region}
            </div>
            <div style={{ color: '#64748b', fontSize: 11 }}>
              {tooltip.count} destination{tooltip.count !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '8px 20px',
          fontSize: 11,
          color: '#2d4a62',
          letterSpacing: '0.03em',
        }}
      >
        {selectedRegion
          ? <span style={{ color: '#f97316' }}>Showing destinations in {selectedRegion}</span>
          : 'Hover to preview · click to filter by region'
        }
      </div>
    </div>
  )
}

// ── FILTER SELECT ─────────────────────────────────────────────────────────────
function FilterSelect({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full appearance-none pl-4 pr-9 py-2.5 rounded-xl border text-sm font-medium bg-white cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 ${
            value
              ? 'border-orange-300 text-orange-800'
              : 'border-gray-200 text-gray-500'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

// ── DESTINATION LIST ITEM ─────────────────────────────────────────────────────
function DestinationRow({ d, highlightText, searchTerm }) {
  return (
    <Link
      to={`/destinations/${d.id}`}
      className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 group bg-white"
    >
      <img
        src={d.image}
        alt={d.name}
        className="w-16 h-14 object-cover rounded-lg shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-400 mb-0.5">{d.state} · {d.region}</div>
        <div className="font-heading font-bold text-gray-900 text-sm leading-tight">
          {highlightText(d.name, searchTerm)}
        </div>
        <span className="inline-block mt-1 text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full capitalize font-medium">
          {d.category}
        </span>
      </div>
      <div className="text-orange-400 group-hover:translate-x-1 transition-transform shrink-0 text-sm">
        →
      </div>
    </Link>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Destinations() {
  const [search, setSearch]               = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [destinationType, setDestinationType] = useState('')
  const [selectedRegion, setSelectedRegion]   = useState('')
  const regions = getRegions()
  const { announce, AnnouncerComponent } = useAnnouncer()
  const { SkipLink }                     = useSkipNavigation()
  const searchId  = generateId('search')
  const resultsId = generateId('results')

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const results = useMemo(() => filterDestinations({
    search:   debouncedSearch,
    category: destinationType ? destinationType.toLowerCase() : '',
    region:   selectedRegion,
  }), [debouncedSearch, destinationType, selectedRegion])

  // Count destinations per region (unfiltered by region, so map always shows real counts)
  const destinationCounts = useMemo(() => {
    const all = filterDestinations({
      search:   debouncedSearch,
      category: destinationType ? destinationType.toLowerCase() : '',
      region:   '',
    })
    return all.reduce((acc, d) => {
      acc[d.region] = (acc[d.region] || 0) + 1
      return acc
    }, {})
  }, [debouncedSearch, destinationType])

  useEffect(() => {
    if (debouncedSearch || destinationType || selectedRegion)
      announce(`Found ${results.length} destinations`)
  }, [results.length, debouncedSearch, destinationType, selectedRegion, announce])

  const highlightText = useCallback((text, term) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, 'gi')
    return text.split(regex).map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">{part}</mark>
        : part
    )
  }, [])

  const clearAll = () => {
    setSearch('')
    setDebouncedSearch('')
    setDestinationType('')
    setSelectedRegion('')
  }

  const hasFilters = debouncedSearch || destinationType || selectedRegion

  return (
    <div>
      <SkipLink href={`#${resultsId}`}>Skip to destinations</SkipLink>

      {/* ── HERO ── */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="/usa-trip-planner-destinations.webp"
          alt="USA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-white mb-3 tracking-tight">
            Explore Destinations
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
            From sun-soaked beaches to buzzing cities — find your next American adventure.
          </p>
        </div>
      </div>

      <div className="container-custom py-10">

        {/* ── FILTER BAR ── */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">

            {/* Search */}
            <div>
              <label htmlFor={searchId} className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Search
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>
                <input
                  id={searchId}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cities, states, or keywords…"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all"
                />
              </div>
            </div>

            <FilterSelect
              label="Destination type"
              value={destinationType}
              onChange={setDestinationType}
              options={DESTINATION_TYPES}
              placeholder="All types"
            />
            <FilterSelect
              label="Region"
              value={selectedRegion}
              onChange={setSelectedRegion}
              options={regions}
              placeholder="All regions"
            />
          </div>

          {/* Active filter summary */}
          {hasFilters && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                <span className="font-semibold text-gray-700">{results.length}</span> destination{results.length !== 1 ? 's' : ''} found
                {debouncedSearch && <span className="ml-1">for "{debouncedSearch}"</span>}
                {destinationType && <span className="ml-1">· {destinationType}</span>}
                {selectedRegion && <span className="ml-1">· {selectedRegion}</span>}
              </p>
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-orange-500 transition-colors font-medium"
              >
                Clear all ×
              </button>
            </div>
          )}
        </div>

        {/* ── 2-COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">

          {/* LEFT — MAP (sticky) */}
          <div className="sticky top-6">
            <USAMap
              selectedRegion={selectedRegion}
              onRegionSelect={setSelectedRegion}
              destinationCounts={destinationCounts}
            />
          </div>

          {/* RIGHT — DESTINATION LIST */}
          <div id={resultsId} aria-label="Destinations list">

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-gray-900 text-lg">
                {selectedRegion ? selectedRegion : 'All Destinations'}
              </h2>
              <span className="text-sm text-gray-400">
                {results.length} {results.length === 1 ? 'place' : 'places'}
              </span>
            </div>

            {results.length > 0 ? (
              <div className="space-y-2.5">
                {results.map(d => (
                  <DestinationRow
                    key={d.id}
                    d={d}
                    highlightText={highlightText}
                    searchTerm={debouncedSearch}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-gray-500 font-medium mb-1">No destinations found</p>
                <p className="text-sm text-gray-400 mb-4">Try a different region or filter</p>
                <button
                  onClick={clearAll}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium underline underline-offset-2 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnnouncerComponent />
    </div>
  )
}
