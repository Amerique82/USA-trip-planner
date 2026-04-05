export const CATEGORIES = [
  'Destinations',
  'Road Trips',
  'Travel Tips',
  'Budget Travel',
  'Food & Dining',
  'Travel Styles',
]

export const TAGS = [
  'Solo Travel',
  'Couples Getaways',
  'Family Friendly',
  'Weekend Trips',
  'First Time in USA',
  'City Escapes',
  'Beach Holidays',
  'National Parks',
]

const guides = [
  // ── DESTINATIONS ──────────────────────────────────────
  {
    id: 'san-francisco-guide',
    title: 'The Ultimate San Francisco Guide',
    category: 'Destinations',
    tags: ['City Escapes', 'First Time in USA', 'Couples Getaways', 'Solo Travel'],
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop',
    excerpt: 'Everything you need to know about visiting the Golden Gate city.',
    sections: [
      { title: 'Getting Around', text: 'San Francisco is best explored by cable car, BART, and on foot. Buy a Clipper card for easy transit access.' },
      { title: 'Where to Stay', text: 'Union Square for central access, Fishermans Wharf for tourists, Mission District for local vibes.' },
      { title: 'Must-See Spots', text: 'Golden Gate Bridge, Alcatraz, Chinatown, Painted Ladies, and Lombard Street are essential visits.' },
    ],
  },
  {
    id: 'new-york-city-guide',
    title: 'New York City: A First-Timer\'s Guide',
    category: 'Destinations',
    tags: ['City Escapes', 'First Time in USA', 'Solo Travel', 'Weekend Trips'],
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
    excerpt: 'Navigate the Big Apple like a local — from Times Square to hidden Brooklyn gems.',
    sections: [
      { title: 'Neighbourhoods', text: 'Manhattan for icons, Brooklyn for cool vibes, Queens for diverse food scenes, and the Bronx for culture.' },
      { title: 'Getting Around', text: 'The subway runs 24/7. Buy an OMNY card or tap your contactless bank card. Walking is the best way to explore.' },
      { title: 'Top Experiences', text: 'Central Park, Statue of Liberty, Brooklyn Bridge, The Met, and a Broadway show are must-dos.' },
    ],
  },

  // ── ROAD TRIPS ────────────────────────────────────────
  {
    id: 'pacific-coast-highway',
    title: 'Pacific Coast Highway: The Ultimate Road Trip',
    category: 'Road Trips',
    tags: ['Couples Getaways', 'Solo Travel', 'Beach Holidays', 'National Parks'],
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop',
    excerpt: 'Drive from San Francisco to Los Angeles along one of the world\'s most scenic coastal roads.',
    sections: [
      { title: 'Route Overview', text: 'The PCH stretches roughly 650 miles. Allow 3-5 days to enjoy it properly with stops along the way.' },
      { title: 'Key Stops', text: 'Big Sur, Monterey, Santa Barbara, Hearst Castle, and Malibu are highlights you should not miss.' },
      { title: 'Best Time to Go', text: 'April to October offers the best weather. Avoid summer weekends for lighter traffic.' },
    ],
  },
  {
    id: 'route-66-adventure',
    title: 'Route 66: America\'s Most Iconic Road Trip',
    category: 'Road Trips',
    tags: ['Family Friendly', 'Couples Getaways', 'First Time in USA'],
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702712?w=800&auto=format&fit=crop',
    excerpt: 'Follow the Mother Road from Chicago to Santa Monica — 2,400 miles of Americana.',
    sections: [
      { title: 'Planning Your Drive', text: 'Allow 2-3 weeks for the full route. The road passes through 8 states and 3 time zones.' },
      { title: 'Iconic Stops', text: 'Cadillac Ranch in Texas, the Grand Canyon detour, Wigwam Motel in Arizona, and the Santa Monica Pier.' },
      { title: 'Budget Tips', text: 'Stay at roadside motels, eat at local diners, and fuel up at smaller towns for cheaper petrol.' },
    ],
  },

  // ── TRAVEL TIPS ───────────────────────────────────────
  {
    id: 'first-time-usa',
    title: 'First Time in the USA: What to Know',
    category: 'Travel Tips',
    tags: ['First Time in USA', 'Solo Travel', 'Couples Getaways', 'Family Friendly'],
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&auto=format&fit=crop',
    excerpt: 'Essential tips for international visitors arriving in America.',
    sections: [
      { title: 'Tipping Culture', text: 'Tip 15-20% at restaurants, $1-2 per drink at bars, and $2-5 per night for hotel housekeeping.' },
      { title: 'Driving', text: 'Americans drive on the right. An International Driving Permit is recommended but not always required.' },
      { title: 'Safety', text: 'The USA is generally safe for tourists. Use common sense in cities and keep valuables secure.' },
    ],
  },
  {
    id: 'packing-essentials',
    title: 'Packing Essentials for a USA Trip',
    category: 'Travel Tips',
    tags: ['First Time in USA', 'Solo Travel', 'Family Friendly'],
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1553531384-411a247ccd73?w=800&auto=format&fit=crop',
    excerpt: 'What to pack for different climates, seasons, and activities across America.',
    sections: [
      { title: 'Clothing Layers', text: 'The USA spans every climate. Pack layers — even summer evenings in San Francisco can be chilly.' },
      { title: 'Tech & Documents', text: 'Bring a universal adapter (Type A/B), your ESTA confirmation, travel insurance documents, and a portable charger.' },
      { title: 'Health & Safety', text: 'Pack prescription medications in original packaging, basic first aid, sunscreen, and insect repellent for outdoor areas.' },
    ],
  },

  // ── BUDGET TRAVEL ─────────────────────────────────────
  {
    id: 'budget-tips',
    title: 'Budget Travel Tips for the USA',
    category: 'Budget Travel',
    tags: ['Solo Travel', 'First Time in USA', 'Weekend Trips'],
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop',
    excerpt: 'How to explore America without breaking the bank.',
    sections: [
      { title: 'Accommodation', text: 'Use hostels, Airbnb, and motel chains like Motel 6. Book midweek for lower rates.' },
      { title: 'Food', text: 'Eat at food trucks, diners, and supermarket delis. Lunch specials are your best friend.' },
      { title: 'Transport', text: 'Greyhound buses and Amtrak trains are affordable. Rent a car for road trips and split costs.' },
    ],
  },
  {
    id: 'free-things-usa',
    title: 'Best Free Things to Do in the USA',
    category: 'Budget Travel',
    tags: ['Solo Travel', 'Family Friendly', 'City Escapes', 'National Parks'],
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop',
    excerpt: 'Museums, parks, beaches, and experiences that won\'t cost you a penny.',
    sections: [
      { title: 'Free Museums', text: 'The Smithsonian museums in Washington D.C. are all free. Many city museums offer free entry days each month.' },
      { title: 'National Parks', text: 'Several days per year offer free entry to all national parks. State parks and beaches are often free year-round.' },
      { title: 'City Activities', text: 'Walk the Brooklyn Bridge, explore street art in Miami, hike Griffith Park in LA, or catch a sunset at any beach.' },
    ],
  },

  // ── FOOD & DINING ─────────────────────────────────────
  {
    id: 'usa-food-guide',
    title: 'Eating Across America: A Food & Dining Guide',
    category: 'Food & Dining',
    tags: ['City Escapes', 'Couples Getaways', 'Family Friendly', 'Weekend Trips'],
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
    excerpt: 'From deep-dish pizza to Southern BBQ — the essential dishes and restaurants to try across the USA.',
    sections: [
      { title: 'Regional Classics', text: "Don't leave the USA without trying New York pizza, Texas BBQ brisket, New Orleans gumbo, and a proper Philly cheesesteak." },
      { title: 'Where to Eat', text: 'Explore local diners for breakfast, food halls for variety, and farm-to-table restaurants for the freshest seasonal ingredients.' },
      { title: 'Food Etiquette', text: 'Tipping 18-20% is standard. Many restaurants allow BYO wine with a corkage fee. Portions are generous — sharing is common and accepted.' },
    ],
  },
  {
    id: 'best-food-cities',
    title: 'Top 5 Food Cities in America',
    category: 'Food & Dining',
    tags: ['City Escapes', 'Couples Getaways', 'Solo Travel'],
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    excerpt: 'New Orleans, New York, Portland, Austin, and Los Angeles — where flavour meets culture.',
    sections: [
      { title: 'New Orleans', text: "Gumbo, beignets, po' boys, and crawfish boils. The food scene here is deeply rooted in Creole and Cajun traditions." },
      { title: 'Portland', text: 'A food truck paradise with over 500 carts. Known for craft coffee, farm-to-table dining, and inventive vegan cuisine.' },
      { title: 'Austin', text: 'BBQ capital of Texas. Franklin Barbecue is legendary, but smaller joints like Micklethwait are equally impressive.' },
    ],
  },

  // ── TRAVEL STYLES ─────────────────────────────────────
  {
    id: 'solo-travel-usa',
    title: 'Solo Travel in the USA: A Complete Guide',
    category: 'Travel Styles',
    tags: ['Solo Travel', 'City Escapes', 'National Parks'],
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&auto=format&fit=crop',
    excerpt: 'How to plan a safe, fulfilling solo adventure across America.',
    sections: [
      { title: 'Best Destinations', text: 'Portland, Austin, San Diego, and national parks like Yosemite are solo-friendly with welcoming communities.' },
      { title: 'Safety Tips', text: 'Share your itinerary with someone back home, stay in well-reviewed hostels, and trust your instincts.' },
      { title: 'Meeting People', text: 'Stay in hostels with common areas, join free walking tours, and use apps like Meetup for local events.' },
    ],
  },
  {
    id: 'family-travel-usa',
    title: 'Family Travel in the USA: Best Destinations',
    category: 'Travel Styles',
    tags: ['Family Friendly', 'Beach Holidays', 'National Parks', 'Weekend Trips'],
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop',
    excerpt: 'Theme parks, national parks, and beach towns — the best USA destinations for families.',
    sections: [
      { title: 'Theme Parks', text: 'Orlando is the capital — Walt Disney World, Universal Studios, and SeaWorld are all within reach. San Diego has LEGOLAND and the Zoo.' },
      { title: 'National Parks', text: 'Yellowstone, Grand Canyon, and Acadia are family favourites. Junior Ranger programmes keep kids engaged.' },
      { title: 'Beach Holidays', text: 'Clearwater Beach in Florida, Outer Banks in North Carolina, and San Diego offer gentle waves and family-friendly amenities.' },
    ],
  },
]

export function getGuideCategories() { return CATEGORIES }
export function getGuideTags() { return TAGS }

export function filterGuides({ search = '', category = '', tags = [] }) {
  return guides.filter((g) => {
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !category || g.category === category
    const matchTags = tags.length === 0 || tags.every((t) => g.tags.includes(t))
    return matchSearch && matchCategory && matchTags
  })
}

export function getGuideById(id) { return guides.find((g) => g.id === id) }

export default guides
