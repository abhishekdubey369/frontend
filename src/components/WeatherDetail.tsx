'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WeatherData } from '@/types/weather'
import { getWeatherQuote, getWeatherRecommendation } from '@/utils/weatherUtils'
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs"
import ActivityCreator from '@/components/ActivityCreator'
import EventCreator from '@/components/EventCreator'

interface WeatherDetailProps {
  weather: WeatherData
  onClose: () => void
}

export function WeatherDetail({ weather, onClose }: WeatherDetailProps) {
  const { theme } = useTheme()
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Weather Details for {weather.name}</CardTitle>
        <Button onClick={onClose}>Close</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Current Weather</h3>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Weather Quote</h3>
          <p className="italic">{getWeatherQuote(theme)}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Recommendation</h3>
          <p>{getWeatherRecommendation(theme)}</p>
        </div>

        <Tabs defaultValue="activities">
          <TabsList>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <ActivityCreator />
          <EventCreator />
        </Tabs>
      </CardContent>
    </Card>
  )
}

