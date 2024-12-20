import { WeatherData } from '@/types/weather'

export function determineTheme(weatherData: WeatherData): string {
  const { main, weather } = weatherData
  const description = weather[0].description.toLowerCase()

  if (description.includes('rain') || description.includes('drizzle')) return 'rainy'
  if (weatherData.wind.speed > 5) return 'windy'
  if (description.includes('clear')) return 'sunny'
  if (description.includes('cloud')) return 'cloudy'
  if (description.includes('mist') || description.includes('fog')) return 'dreamy'
  
  // Season-based themes (you might want to adjust these based on more specific criteria)
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  if (month === 11 || month <= 1) return 'winter'

  // Default theme
  return 'sunny'
}

