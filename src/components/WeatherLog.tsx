'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash2, Wind, Droplets, Gauge, Thermometer, Eye } from 'lucide-react'
import { WeatherData } from '@/types/weather'
import { determineTheme } from '@/utils/themeUtils'
import { WeatherDetail } from '@/components/WeatherDetail'
import { fetchWeatherData, deleteWeatherLog } from '@/helper/weatherHelper'

export default function WeatherLog() {
  const [city, setCity] = useState('')
  const [weatherLogs, setWeatherLogs] = useState<WeatherData[]>([])
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null)
  const { setTheme } = useTheme()

  const handleFetchWeather = async () => {
    if (city) {
      const data = await fetchWeatherData(city)
      if (data) {
        setWeatherLogs(prev => [data, ...prev])
        setTheme(determineTheme(data) as any)
      }
    }
  }

  const handleDeleteLog = async (id: number) => {
    await deleteWeatherLog(id)
    setWeatherLogs(prev => prev.filter(log => log.id !== id))
  }

  const handleViewDetails = (weather: WeatherData) => {
    setSelectedWeather(weather)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Weather Log Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="sm:w-64"
            />
            <Button onClick={handleFetchWeather}>Fetch Weather</Button>
          </div>
        </CardContent>
      </Card>

      {selectedWeather ? (
        <WeatherDetail weather={selectedWeather} onClose={() => setSelectedWeather(null)} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Pressure</TableHead>
              <TableHead>Humidity</TableHead>
              <TableHead>Wind Speed</TableHead>
              <TableHead>Wind Direction</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weatherLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.name}</TableCell>
                <TableCell>
                  <Thermometer className="inline mr-2" />
                  {(log.main.temp - 273.15).toFixed(2)}°C
                </TableCell>
                <TableCell>
                  <Gauge className="inline mr-2" />
                  {log.main.pressure} hPa
                </TableCell>
                <TableCell>
                  <Droplets className="inline mr-2" />
                  {log.main.humidity}%
                </TableCell>
                <TableCell>
                  <Wind className="inline mr-2" />
                  {log.wind.speed} m/s
                </TableCell>
                <TableCell>{log.wind.deg}°</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(log)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteLog(log.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

