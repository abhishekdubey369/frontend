import { WeatherData } from '@/types/weather'

export async function fetchWeatherData(city: string): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=335cc3f4e7ce883220210d7fc184f8bf`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }
    const data: WeatherData = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return null
  }
}

export async function deleteWeatherLog(id: number): Promise<void> {
  // In a real application, you would delete the log from your database here
  console.log(`Deleting weather log with id: ${id}`)
}