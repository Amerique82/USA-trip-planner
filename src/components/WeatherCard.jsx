export default function WeatherCard({ weather, loading, error, cityName, onRetry }) {
  if (loading) return (
    <div className="bg-white border border-gray-200 rounded-xl p-5" role="status" aria-label="Loading weather data">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
      <p className="text-xs text-gray-400 mt-3">Loading weather for {cityName}...</p>
    </div>
  )
  
  if (error) return (
    <div className="bg-white border border-red-200 rounded-xl p-5" role="alert" aria-label="Weather data unavailable">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-red-800 mb-2">Weather Unavailable</h3>
          <p className="text-red-700 text-sm mb-3">{error}</p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="text-sm text-red-600 hover:text-red-800 underline font-medium"
              aria-label="Retry loading weather data"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
  
  if (!weather) return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-gray-400 text-sm">Weather data unavailable</p>
    </div>
  )
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-bold text-primary-900">Current Weather</h3>
        <span className="text-xs text-gray-500">{cityName}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-4xl" role="img" aria-label={weather.description}>
          {getWeatherIcon(weather.code)}
        </div>
        <div>
          <p className="text-3xl font-bold text-primary-800">{weather.temp}°F</p>
          <p className="text-gray-600 capitalize">{weather.description}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-sm text-gray-500">
        <span aria-label={`Wind speed ${weather.windSpeed} miles per hour`}>💨 {weather.windSpeed} mph</span>
        <span aria-label={`Humidity ${weather.humidity} percent`}>💧 {weather.humidity}%</span>
      </div>
    </div>
  )
}

// Helper function to get weather emoji based on weather code
function getWeatherIcon(code) {
  const icons = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️', 51: '🌦️', 53: '🌦️', 55: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '⛈️', 71: '🌨️', 73: '🌨️', 75: '❄️',
    80: '🌦️', 81: '🌧️', 82: '⛈️', 95: '⛈️',
  }
  return icons[code] || '🌡️'
}
