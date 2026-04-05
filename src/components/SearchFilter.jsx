import { generateId } from '../utils/accessibility.jsx'

export default function SearchFilter({ filters, onFilterChange, options = [] }) {
  const update = (key, value) => onFilterChange({ ...filters, [key]: value })
  
  // Generate unique IDs for accessibility
  const searchId = generateId('search')
  
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* Search Input with proper label */}
      <div className="relative">
        <label htmlFor={searchId} className="sr-only">Search destinations</label>
        <input 
          type="text" 
          placeholder="Search..." 
          value={filters.search || ''} 
          onChange={(e) => update('search', e.target.value)}
          id={searchId}
          aria-label="Search destinations"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-48" 
        />
      </div>
      
      {/* Select Dropdowns with proper labels */}
      {options.map((opt) => {
        const selectId = generateId(`select-${opt.key}`)
        return (
          <div key={opt.key}>
            <label htmlFor={selectId} className="sr-only">{opt.label}</label>
            <select 
              key={opt.key} 
              value={filters[opt.key] || ''} 
              onChange={(e) => update(opt.key, e.target.value)}
              id={selectId}
              aria-label={opt.label}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">{opt.label}</option>
              {opt.values.map((v) => (<option key={v} value={v}>{v}</option>))}
            </select>
          </div>
        )
      })}
    </div>
  )
}
