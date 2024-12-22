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
import { fetchActivityRecommendation , fetchSummary} from '@/helper/recommendation'
import axios from 'axios'

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isDisplaying, setIsDisplaying] = useState(false)
  const [city, setCity] = useState('London')
  const [activityRecommendation, setActivityRecommendation] = useState<string[] | null>(null)
  const [Summary, setSummary] = useState<string | null>(null)
  const [quote, setQuote] = useState<string | null>(null)

  const getSummary = async ()=>{
    const data = await fetchWeatherData(city)
        if(data){
        const weatherCondition = getWeatherCondition(data.weather[0].main)
        const res = await fetchSummary(weatherCondition,city)
        // console.log(res)
        const resjs = await JSON.parse(res)
        setSummary(resjs.flirt_summary || 'Model not configure')
        setQuote(resjs.quote|| 'Model not configure')
        }
  }

  const getReccomendation = async ()=>{
    const data = await fetchWeatherData(city)
    // console.log(data)
        if(data){
        const weatherCondition = getWeatherCondition(data.weather[0].main)
        const recommendation:any = await fetchActivityRecommendation(weatherCondition,city)
        // console.log(recommendation)
        setActivityRecommendation(recommendation)
        }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    const fetchData = async () => {
      const data = await fetchWeatherData(city)
      setWeatherData(data)
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
    if (weatherData) {
      const response = await axios.post("/api/log_handler", {weather: weatherData});
      console.log(response)
      if (response.status === 201) {
        const savedLog = await response.data;
        setWeatherData(savedLog);
      }
    }
    setWeatherData(data)
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
            <Button onClick={()=>{
                handleDisplay();
                getReccomendation();
                getSummary();
            }}>Display</Button>
            <Button onClick={()=>{
                handleLog();
                getReccomendation();
                getSummary();
            }}>Double Click to Log</Button>
          </div>
          <div>
          </div>
          {Summary &&(Summary?(<p>{Summary}</p>):(<p>Loading summary...</p>))}
          {weatherData && <WeatherDisplay weather={weatherData} />}
          {activityRecommendation && (activityRecommendation ? (
            activityRecommendation.map((rec:any, idx:any) =>
              <ActivityRecommendation 
              key={idx}
              activity={rec} 
              onSchedule={(date, time) => console.log('Scheduled:', date, time)}
              onDelete={() => setActivityRecommendation(null)}
            />
            )
          ) : (
            <p>Loading recommendations...</p>
          ))}
          {quote&&(quote ? (<p>{quote}</p>):(<p>Loading quote...</p>))}
        </CardContent>
      </Card>
    </div>
  )
}

