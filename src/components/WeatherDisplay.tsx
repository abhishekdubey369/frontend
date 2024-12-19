import { useState } from 'react'
import { WeatherData } from '@/types/weather'

interface WeatherDisplayProps {
  currentWeather: WeatherData | null
  fetchWeather: (city: string) => Promise<void>
  logWeather: () => void
  autoRefresh: boolean
  setAutoRefresh: (value: boolean) => void
}

export default function WeatherDisplay({ 
  currentWeather, 
  fetchWeather, 
  logWeather,
  autoRefresh,
  setAutoRefresh
}: WeatherDisplayProps) {
  const [city, setCity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city) {
      fetchWeather(city)
      setCity('')
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
          Get Weather
        </button>
        <button 
          type="button" 
          onClick={logWeather} 
          className="bg-green-500 text-white p-2 rounded mr-2"
          disabled={!currentWeather}
        >
          Log Weather
        </button>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Auto-refresh every 2 seconds</span>
        </label>
      </form>
      {currentWeather && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">{currentWeather.city}</h3>
          <p>Temperature: {currentWeather.temperature}°C</p>
          <p>Pressure: {currentWeather.pressure} hPa</p>
          <p>Humidity: {currentWeather.humidity}%</p>
          <p>Wind: {currentWeather.windSpeed} m/s, {currentWeather.windDirection}°</p>
          <p>Description: {currentWeather.description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
            alt={currentWeather.description}
            className="mt-2"
          />
        </div>
      )}
    </div>
  )
}

