'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { WeatherData } from '@/types/weather'
import { getWeatherQuote, getWeatherRecommendation } from '@/utils/weatherUtils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedCalendar } from "@/components/ui/enhanced-calendar"

interface WeatherDetailProps {
  weather: WeatherData
  onClose: () => void
}

interface Activity {
  id: string
  name: string
  date: Date
}

interface Event {
  id: string
  name: string
  date: Date
  ticketPrice: number
  invitedFriends: string[]
}

export function WeatherDetail({ weather, onClose }: WeatherDetailProps) {
  const { theme } = useTheme()
  const [activity, setActivity] = useState('')
  const [activities, setActivities] = useState<Activity[]>([])
  const [event, setEvent] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [ticketPrice, setTicketPrice] = useState('')
  const [invitedFriend, setInvitedFriend] = useState('')

  const handleAddActivity = () => {
    if (activity) {
      const newActivity: Activity = {
        id: Date.now().toString(),
        name: activity,
        date: new Date(),
      }
      setActivities([...activities, newActivity])
      setActivity('')
    }
  }

  const handleScheduleEvent = () => {
    if (event) {
      const newEvent: Event = {
        id: Date.now().toString(),
        name: event,
        date: new Date(),
        ticketPrice: parseFloat(ticketPrice) || 0,
        invitedFriends: [],
      }
      setEvents([...events, newEvent])
      setEvent('')
      setTicketPrice('')
    }
  }

  const handleInviteFriend = (eventId: string) => {
    if (invitedFriend) {
      setEvents(events.map(e => {
        if (e.id === eventId) {
          return { ...e, invitedFriends: [...e.invitedFriends, invitedFriend] }
        }
        return e
      }))
      setInvitedFriend('')
    }
  }

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
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Activity Planner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter an activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />
                  <EnhancedCalendar />
                  <Button onClick={handleAddActivity}>Add Activity</Button>
                </div>
                <div>
                  <h4 className="font-semibold">Planned Activities:</h4>
                  <ul>
                    {activities.map((a) => (
                      <li key={a.id}>
                        {a.name} - {a.date.toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Event Scheduler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter event name"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                  />
                  <EnhancedCalendar />
                  <Input
                    type="number"
                    placeholder="Ticket price"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                  />
                  <Button onClick={handleScheduleEvent}>Schedule Event</Button>
                </div>
                <div>
                  <h4 className="font-semibold">Scheduled Events:</h4>
                  <ul>
                    {events.map((e) => (
                      <li key={e.id} className="mb-2">
                        <p>{e.name} - {e.date.toLocaleDateString()} - Ticket: ${e.ticketPrice}</p>
                        <div className="flex space-x-2 mt-1">
                          <Input
                            placeholder="Friend's name"
                            value={invitedFriend}
                            onChange={(evt) => setInvitedFriend(evt.target.value)}
                          />
                          <Button onClick={() => handleInviteFriend(e.id)}>Invite</Button>
                        </div>
                        <p>Invited: {e.invitedFriends.join(', ')}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

