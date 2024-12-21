import { WeatherData } from '@/types/weather'

interface WeatherDisplayProps {
  weather: WeatherData
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
      <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Description: {weather.weather[0].description}</p>
    </div>
  )
}

