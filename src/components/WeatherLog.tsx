'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash2, Wind, Droplets, Gauge, Thermometer, Eye } from 'lucide-react'
import { WeatherData } from '@/types/weather'
import { useEffect } from 'react'
import { WeatherDetail } from '@/components/WeatherDetail'
import { fetchWeatherData } from '@/helper/weatherHelper'

export default function WeatherLog() {
  const [city, setCity] = useState('')
  const [weatherLogs, setWeatherLogs] = useState<WeatherData[]>([])
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null)

  const handleFetchWeather = async () => {
    if (city) {
      const weatherData = await fetchWeatherData(city);
      if (weatherData) {
        // Save to database
        const response = await fetch("/api/log_handler", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weather: weatherData, activity: ["fetch"] }),
        });
  
        if (response.ok) {
          const savedLog = await response.json();
          setWeatherLogs((prev) => [savedLog, ...prev]);
        }
      }
    }
  };
  
  const handleDeleteLog = async (id: string) => {
    const response = await fetch(`/api/log_handler?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      setWeatherLogs((prev) => prev.filter((log) => log.id !== id));
    }
  };
  
  const fetchWeatherLogs = async () => {
    const response = await fetch("/api/log_handler", { method: "GET" });
    if (response.ok) {
      const logs = await response.json();
      setWeatherLogs(logs);
    }
  };
  
  useEffect(() => {
    fetchWeatherLogs();
  }, []);  

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
            <Button onClick={handleFetchWeather}>Log Weather</Button>
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
              <TableRow key={log.weather.id}>
                <TableCell>{log.weather.name}</TableCell>
                <TableCell>
  <Thermometer className="inline mr-2" />
  {log.weather?.main?.temp
    ? `${(log.weather.main.temp - 273.15).toFixed(2)}°C`
    : "N/A"}
</TableCell>
                <TableCell>
                  <Gauge className="inline mr-2" />
                  {log.weather.main.pressure} hPa
                </TableCell>
                <TableCell>
                  <Droplets className="inline mr-2" />
                  {log.weather.main.humidity}%
                </TableCell>
                <TableCell>
                  <Wind className="inline mr-2" />
                  {log.weather.wind.speed} m/s
                </TableCell>
                <TableCell>{log.weather.wind.deg}°</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(log.weather)}>
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

