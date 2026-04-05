# USA Trip Planner ✈️
### *Dream · Plan · Travel*

An interactive travel planning platform built with React, designed for international travellers exploring the United States.

🌐 **Live site:** [www.usa-trip-planner.com](https://www.usa-trip-planner.com)

---

## Lighthouse Scores

| Performance | Accessibility | Best Practices | SEO |
|:-----------:|:-------------:|:--------------:|:---:|
| 94          |       93      |       100      | 92  |

> Audited with Lighthouse 13.0.2 · Desktop · April 2026  
> Full report available in [`/docs`](./docs)

---

## About the Project

USA Trip Planner is a project idea I had back in 2025, then it finally started as a university project for the Web Design 2 module (MSc Web Development, University of Roehampton), but the vision was always bigger than that — this is meant to be a real platform. The goal is to give international travellers one place to find destination guides, ready-to-use itineraries, and practical planning tools, without jumping between dozens of websites.

The site is live, has a custom domain, and is built to grow. For now, destination, blog, and itinerary content uses Unsplash images as placeholders, with the structure in place to scale into a fully operational platform in the future.

---

## From Wireframe to Reality

The original proposal outlined an ambitious structure. During development, I realised that some sections were too complex and were getting in the way of a good user experience. I made deliberate decisions to simplify where needed — prioritising clarity and ease of navigation over feature quantity.

One thing I kept close attention to was detail: the site includes a custom favicon, consistent typography, and a colour system that stays true across every page. Small things matter.

---

## Currency Converter — API Cascade Strategy

The currency converter was one of the most technically challenging features. Using a single API kept failing — rate limits, CORS issues, downtime — so I built a cascade system that connects to **4 different currency APIs in sequence**. If the first one fails, the next one runs automatically, and so on. This means the converter stays functional even when individual APIs have issues, which happens more often than expected with free-tier services.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Component-based UI, fast builds |
| React Router | Client-side routing |
| Tailwind CSS | Responsive, utility-first styling |
| Context API | Shared state across pages |
| Open-Meteo API | Live weather data (no API key required) |
| 4× Currency APIs | Cascading exchange rate system |

---

## Pages

- **Home** — Hero, featured destination with live weather, currency converter, destinations and itineraries preview
- **Destinations** — Search + filters, card grid, destination detail with live weather sidebar
- **Travel Guides** — Search + category filter, article cards with Unsplash placeholders
- **Itineraries** — Filter by style and region, day-by-day detail view
- **Create Itinerary** — Form with full validation, dynamic day builder, download as .txt
- **Deals & Discounts** — Curated travel resources

---

## Features

-  Real-time search and dropdown filters across all pages
-  Live weather for every destination (Open-Meteo)
-  Currency converter with 4-API cascade fallback
-  Favourites with persistent state via Context API
-  Create and download custom itineraries
-  Custom favicon — because details matter
-  Semantic HTML, ARIA labels, keyboard navigation
-  GDPR-compliant cookie consent banner
-  Fully responsive — mobile, tablet, desktop

---

## Accessibility & Ethics

- WCAG 2.1 AA compliance targets (Lighthouse + WAVE audits)
- No dark patterns, no fake urgency
- Affiliate links clearly disclosed
- All API sources and images properly attributed
- IP anonymisation and consent-first analytics approach

---

## Running Locally

```bash
git clone https://github.com/Amerique82/USA-trip-planner.git
cd USA-trip-planner
npm install
npm run dev
```

---

## Future Plans

This project doesn't stop at the assessment. Planned next steps include:

- Headless CMS to manage real content without touching code
- User authentication for saved itineraries and preferences
- Interactive map with destination pins
- Multilingual support (Spanish and Portuguese first)
- Progressive Web App for offline access

---

*Built by Amerie · MSc Web Development · University of Roehampton · 2026*
