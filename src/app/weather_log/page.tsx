"use client"

import { useState, useEffect } from 'react'
import WeatherLog from '@/components/WeatherLog'
import WeatherDisplay from '@/components/WeatherDisplay'
import ThemeSelector from '@/components/ThemeSelector'
import ActivityPlanner from '@/components/ActivityPlanner'
import EventScheduler from '@/components/EventScheduler'
import WeatherQuote from '@/components/WeatherQuote'
import WeatherRecommendation from '@/components/WeatherRecommendation'
import { WeatherData, Theme, Activity, Event } from '@/types/weather'

export default function WeatherLogManagement() {
  const [weatherLogs, setWeatherLogs] = useState<WeatherData[]>([])
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [theme, setTheme] = useState<Theme>('sunny')
  const [activities, setActivities] = useState<Activity[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [autoRefresh, setAutoRefresh] = useState(false)

  useEffect(() => {
    // Load data from local storage
    const storedLogs = localStorage.getItem('weatherLogs')
    if (storedLogs) {
      setWeatherLogs(JSON.parse(storedLogs))
    }
    const storedActivities = localStorage.getItem('activities')
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities))
    }
    const storedEvents = localStorage.getItem('events')
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    }
  }, [])

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem('weatherLogs', JSON.stringify(weatherLogs))
    localStorage.setItem('activities', JSON.stringify(activities))
    localStorage.setItem('events', JSON.stringify(events))
  }, [weatherLogs, activities, events])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (autoRefresh && currentWeather) {
      interval = setInterval(() => {
        fetchWeather(currentWeather.city);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, currentWeather]);

  const fetchWeather = async (city: string) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=335cc3f4e7ce883220210d7fc184f8bf&units=metric`)
      const data = await response.json()
      const newWeatherData: WeatherData = {
        id: Date.now(),
        city: data.name,
        temperature: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        timestamp: new Date().toISOString(),
      }
      setCurrentWeather(newWeatherData)
      setTheme(getThemeFromWeather(newWeatherData.description))
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  const logWeather = () => {
    if (currentWeather) {
      setWeatherLogs(prevLogs => [...prevLogs, currentWeather])
    }
  }

  const deleteLog = (id: number) => {
    setWeatherLogs(prevLogs => prevLogs.filter(log => log.id !== id))
  }

  const addActivity = (activity: Activity) => {
    setActivities(prevActivities => [...prevActivities, activity])
  }

  const addEvent = (event: Event) => {
    setEvents(prevEvents => [...prevEvents, event])
  }


  return (
    <div className={`min-h-screen p-8 ${getThemeClass(theme)}`}>
      <h1 className="text-4xl font-bold mb-8">Weather Log Management</h1>
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <WeatherDisplay 
            currentWeather={currentWeather} 
            fetchWeather={fetchWeather} 
            logWeather={logWeather}
            autoRefresh={autoRefresh}
            setAutoRefresh={setAutoRefresh}
          />
          <WeatherQuote weather={currentWeather?.description} />
          <WeatherRecommendation weather={currentWeather} />
          <WeatherLog logs={weatherLogs} deleteLog={deleteLog} />
        </div>
        <div>
          <ActivityPlanner weather={currentWeather} addActivity={addActivity} activities={activities} />
          <EventScheduler weather={currentWeather} addEvent={addEvent} events={events} />
        </div>
      </div>
    </div>
  )
}

function getThemeClass(theme: Theme): string {
  switch (theme) {
    case 'rainy': return 'bg-blue-100 text-blue-900'
    case 'windy': return 'bg-gray-100 text-gray-900'
    case 'sunny': return 'bg-yellow-100 text-yellow-900'
    case 'cloudy': return 'bg-gray-200 text-gray-900'
    case 'dreamy': return 'bg-purple-100 text-purple-900'
    case 'spring': return 'bg-green-100 text-green-900'
    case 'summer': return 'bg-orange-100 text-orange-900'
    case 'winter': return 'bg-blue-200 text-blue-900'
    case 'fall': return 'bg-red-100 text-red-900'
    case 'love': return 'bg-pink-100 text-pink-900'
    default: return 'bg-white text-black'
  }
}

function getThemeFromWeather(description: string): Theme {
  const lowercaseDesc = description.toLowerCase()
  if (lowercaseDesc.includes('rain')) return 'rainy'
  if (lowercaseDesc.includes('cloud')) return 'cloudy'
  if (lowercaseDesc.includes('clear')) return 'sunny'
  if (lowercaseDesc.includes('wind')) return 'windy'
  if (lowercaseDesc.includes('snow')) return 'winter'
  if (lowercaseDesc.includes('fog') || lowercaseDesc.includes('mist')) return 'dreamy'
  return 'sunny' // default theme
}

