'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { fetchWeatherData } from '@/helper/weatherHelper'
import { WeatherData } from '@/types/weather'
import WeatherDisplay from '@/components/WeatherDisplay'
import DashboardMenu from '@/components/DashboardMenu'
import ActivityRecommendation from '@/components/ActivitRecommendation'
import axios from 'axios'

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isDisplaying, setIsDisplaying] = useState(false)
  const [city, setCity] = useState('London')
  const [activityRecommendation, setActivityRecommendation] = useState<string | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    const fetchData = async () => {
      const data = await fetchWeatherData(city)
      setWeatherData(data)
      if (data) {
        const weatherCondition = getWeatherCondition(data.weather[0].main)
        const recommendation = await fetchActivityRecommendation(weatherCondition,city)
        setActivityRecommendation(recommendation)
      }
    }

    if (isDisplaying) {
      fetchData()
      interval = setInterval(fetchData, 2000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isDisplaying, city])

  const handleDisplay = () => {
    setIsDisplaying(true)
  }

  const handleLog = async () => {
    const data = await fetchWeatherData(city)
    setWeatherData(data)
    // Here you would typically save the data to your database
    console.log('Logging weather data:', data)
    setIsDisplaying(true)
  }

  const getWeatherCondition = (weatherMain: string): string => {
    const conditions: Record<string, string> = {
      'Clear': 'sunny',
      'Rain': 'rainy',
      'Clouds': 'cloudy',
      'Snow': 'snowy',
      'Wind': 'windy'
    }
    return conditions[weatherMain] || 'sunny'
  }

  const fetchActivityRecommendation = async (weather: string,city:string): Promise<string> => {
    const dataSent:{
        "city": string,
        "weather": string
    }={
        "city": city,
        "weather": weather
    }
    try {
        const response = await axios.post('/api/genAI/recommendation',dataSent)
        const data = response.data
        return data.activity
    } catch (error:any) {
        const response = await axios.get('/api/genAI/recommendation/recommend?weather='+weather)
        const data = response.data
        return data.activity
    }
  }

  return (
    <div className="container mx-auto p-4">
      <DashboardMenu />
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Weather Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-4">
            <Input
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="sm:w-64"
            />
            <Button onClick={handleDisplay}>Display</Button>
            <Button onClick={handleLog}>Log</Button>
          </div>
          {weatherData && <WeatherDisplay weather={weatherData} />}
          {activityRecommendation && (
            <ActivityRecommendation 
              activity={activityRecommendation} 
              onSchedule={(date, time) => console.log('Scheduled:', date, time)}
              onDelete={() => setActivityRecommendation(null)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

