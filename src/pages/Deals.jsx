import { Link } from 'react-router-dom'

const categories = [
  { name: 'Hotels', items: [
    { name: 'Booking.com', url: 'https://www.booking.com', description: 'Wide selection of hotels and apartments across the USA.' },
    { name: 'Hostelworld', url: 'https://www.hostelworld.com', description: 'Budget-friendly hostels for solo and backpacker travellers.' },
  ]},
  { name: 'Flights', items: [
    { name: 'Skyscanner', url: 'https://www.skyscanner.net', description: 'Compare flights from hundreds of airlines.' },
    { name: 'Google Flights', url: 'https://www.google.com/flights', description: 'Track prices and find the cheapest dates to fly.' },
  ]},
  { name: 'Car Rental', items: [
    { name: 'Rentalcars.com', url: 'https://www.rentalcars.com', description: 'Compare car rental prices from major providers.' },
    { name: 'Turo', url: 'https://www.turo.com', description: 'Rent cars from local hosts — often cheaper than agencies.' },
  ]},
  { name: 'Insurance', items: [
    { name: 'World Nomads', url: 'https://www.worldnomads.com', description: 'Flexible travel insurance designed for adventurous travellers.' },
    { name: 'SafetyWing', url: 'https://www.safetywing.com', description: 'Affordable travel medical insurance for long trips.' },
  ]},
  { name: 'Activities', items: [
    { name: 'GetYourGuide', url: 'https://www.getyourguide.com', description: 'Book tours, attractions, and experiences worldwide.' },
    { name: 'Viator', url: 'https://www.viator.com', description: 'Thousands of tours and activities in every US city.' },
  ]},
  { name: 'Passes', items: [
    { name: 'CityPASS', url: 'https://www.citypass.com', description: 'Bundled admission to top attractions at a discount.' },
    { name: 'Go City', url: 'https://www.gocity.com', description: 'All-inclusive or pick-and-choose attraction passes.' },
  ]},
]

export default function Deals() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/usa-trip-planner-deals.webp" alt="Deals hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-primary-900 mb-3">Deals & Discounts</h1>
          <p className="text-primary-800 text-sm md:text-base max-w-xl">We only recommend trusted services to help you save on your trip.</p>
        </div>
      </div>
    <div className="container-custom py-10">
      <div className="space-y-8">
        {categories.map(cat => (
          <div key={cat.name}>
            <h2 className="font-heading font-bold text-primary-900 text-lg mb-3">{cat.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map(item => (
                <a 
                  key={item.name} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-primary-200 transition-all duration-200 group bg-white"
                >
                  {/* LEFT: Logo placeholder */}
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="font-bold text-gray-400 text-lg">
                      {item.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* RIGHT: Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-primary-900 text-sm">
                      {item.name}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                      {item.description}
                    </div>
                    <div className="text-primary-500 text-xs font-medium mt-2 group-hover:translate-x-1 transition-transform inline-block">
                      Visit →
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
