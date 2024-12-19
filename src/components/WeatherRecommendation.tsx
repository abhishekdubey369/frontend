import { WeatherData } from '@/types/weather'

interface WeatherRecommendationProps {
  weather: WeatherData | null
}

export default function WeatherRecommendation({ weather }: WeatherRecommendationProps) {
  const getRecommendation = () => {
    if (!weather) return "Enter a city to get weather-based recommendations."
    
    const temp = weather.temperature
    const description = weather.description.toLowerCase()

    if (temp > 25 && !description.includes('rain')) {
      return "It's a bright and sunny day—perfect for outdoor activities! Don't forget to apply sunscreen."
    } else if (description.includes('rain')) {
      return "Rain is expected—carry an umbrella and consider indoor activities."
    } else if (description.includes('wind')) {
      return "Windy conditions in your area—avoid outdoor dining and secure loose items."
    } else if (temp < 10) {
      return "It's cold outside. Bundle up and consider indoor activities or warm, comforting food."
    } else {
      return "The weather is mild. It's a good day for various activities, both indoor and outdoor."
    }
  }

  return (
    <div className="my-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Weather Recommendation</h3>
      <p>{getRecommendation()}</p>
    </div>
  )
}

