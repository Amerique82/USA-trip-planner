// Geocode city name to coordinates using Open-Meteo
async function geocode(city) {
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)
    if (!res.ok) {
      throw new Error(`Geocoding service unavailable (${res.status})`)
    }
    const data = await res.json()
    if (data.results && data.results.length > 0) {
      return { lat: data.results[0].latitude, lon: data.results[0].longitude }
    }
    throw new Error('City not found')
  } catch (error) {
    console.error('Geocoding error:', error)
    throw error
  }
}

// Get current weather from Open-Meteo (FREE, no key)
export async function getWeather(city) {
  try {
    const coords = await geocode(city)
    if (!coords) throw new Error('Unable to locate city')
    
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph`
    )
    
    if (!res.ok) {
      throw new Error(`Weather service unavailable (${res.status})`)
    }
    
    const data = await res.json()
    
    if (!data.current) {
      throw new Error('Weather data not available')
    }
    
    const c = data.current
    const descriptions = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Dense drizzle',
      61: 'Slight rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Slight snow', 73: 'Snow', 75: 'Heavy snow',
      80: 'Rain showers', 81: 'Moderate showers', 82: 'Violent showers', 95: 'Thunderstorm',
    }
    return {
      temp: Math.round(c.temperature_2m),
      description: descriptions[c.weather_code] || 'Unknown',
      humidity: c.relative_humidity_2m,
      windSpeed: Math.round(c.wind_speed_10m),
      code: c.weather_code,
    }
  } catch (error) {
    console.error('Weather API error:', error)
    throw new Error(getUserFriendlyErrorMessage(error))
  }
}

// Get forecast for packing tool
export async function getForecast(city, days = 7) {
  try {
    const coords = await geocode(city)
    if (!coords) throw new Error('Unable to locate city')
    
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&temperature_unit=fahrenheit&forecast_days=${days}`
    )
    
    if (!res.ok) {
      throw new Error(`Forecast service unavailable (${res.status})`)
    }
    
    const data = await res.json()
    
    if (!data.daily) {
      throw new Error('Forecast data not available')
    }
    
    return data.daily
  } catch (error) {
    console.error('Forecast API error:', error)
    throw new Error(getUserFriendlyErrorMessage(error))
  }
}

// Convert technical errors to user-friendly messages
function getUserFriendlyErrorMessage(error) {
  const message = error.message.toLowerCase()
  
  if (message.includes('city not found') || message.includes('unable to locate')) {
    return "We couldn't find that city. Please check the spelling and try again."
  }
  if (message.includes('unavailable') || message.includes('network')) {
    return "Weather service is temporarily unavailable. Please try again in a few minutes."
  }
  if (message.includes('data not available')) {
    return "Weather information is not available for this location right now."
  }
  if (message.includes('fetch')) {
    return "Unable to connect to weather service. Please check your internet connection."
  }
  
  return "Something went wrong while fetching weather data. Please try again."
}

// Retry mechanism for failed requests
export async function withRetry(apiCall, maxRetries = 3, delay = 1000) {
  let lastError
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall()
    } catch (error) {
      lastError = error
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
      }
    }
  }
  
  throw lastError
}
