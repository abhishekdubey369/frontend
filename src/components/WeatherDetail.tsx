'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/types/weather';
import { getWeatherQuote, getWeatherRecommendation } from '@/utils/weatherUtils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityCreator from '@/components/ActivityCreator';
import EventCreator from '@/components/EventCreator';
import { fetchActivityRecommendation, fetchSummary } from '@/helper/recommendation';
import { useEffect, useState } from 'react';

interface WeatherDetailProps {
  weather: WeatherData;
  onClose: () => void;
}

export function WeatherDetail({ weather, onClose }: WeatherDetailProps) {
  const { theme } = useTheme();
  const [summary, setSummary] = useState<string | null>(null);
  const [activityRecommendation, setActivityRecommendation] = useState<string[] | null>(null);

  // Fetch summary once
  const getSummary = async () => {
    try {
      const data:any = await fetchSummary(weather.weather[0].main, weather.name);
      setSummary(data.flirt_summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Could not fetch summary at the moment.');
    }
  };

  // Fetch recommendations once
  const getRecommendation = async () => {
    try {
      const recommendation:any = await fetchActivityRecommendation(weather.weather[0].main, weather.name);
      setActivityRecommendation(recommendation);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setActivityRecommendation(['No recommendations available.']);
    }
  };

  // Trigger the fetch functions only once when the component is mounted
  useEffect(() => {
    getSummary();
    getRecommendation();
  }, []); // Empty array ensures this effect runs only once

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Weather Details for {weather.name}</CardTitle>
        <Button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white">
          Close
        </Button>
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
          <p className="italic">{summary || getWeatherQuote(theme)}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Recommendation</h3>
          {activityRecommendation ? (
            activityRecommendation.map((rec, idx) => <p key={idx}>{rec}</p>)
          ) : (
            <p>Loading recommendations...</p>
          )}
        </div>

        <Tabs defaultValue="activities">
          <TabsList>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <div className="p-4">
            <ActivityCreator weather={weather} />
            <EventCreator weather={weather} />
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
