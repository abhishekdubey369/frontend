import { useState } from 'react'
import { WeatherData, Event } from '@/types/weather'

interface EventSchedulerProps {
  weather: WeatherData | null
  addEvent: (event: Event) => void
  events: Event[]
}

export default function EventScheduler({ weather, addEvent, events }: EventSchedulerProps) {
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [ticketPrice, setTicketPrice] = useState('')
  const [invitedFriends, setInvitedFriends] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (eventName && eventDate && weather) {
      addEvent({
        id: Date.now(),
        name: eventName,
        date: eventDate,
        weather: weather.description,
        ticketPrice: ticketPrice ? parseFloat(ticketPrice) : undefined,
        invitedFriends: invitedFriends.split(',').map(friend => friend.trim()),
        timestamp: new Date().toISOString(),
      })
      setEventName('')
      setEventDate('')
      setTicketPrice('')
      setInvitedFriends('')
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Event Scheduler</h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
          className="p-2 border rounded w-full"
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          placeholder="Ticket price (optional)"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          value={invitedFriends}
          onChange={(e) => setInvitedFriends(e.target.value)}
          placeholder="Invited friends (comma-separated)"
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-purple-500 text-white p-2 rounded w-full">
          Schedule Event
        </button>
      </form>
      <div className="space-y-2">
        {events.map(event => (
          <div key={event.id} className="bg-white p-2 rounded">
            <p className="font-semibold">{event.name}</p>
            <p>Date: {event.date}</p>
            <p>Weather: {event.weather}</p>
            {event.ticketPrice && <p>Ticket Price: ${event.ticketPrice.toFixed(2)}</p>}
            {event.invitedFriends.length > 0 && (
              <p>Invited Friends: {event.invitedFriends.join(', ')}</p>
            )}
            <p className="text-sm text-gray-500">Scheduled at: {new Date(event.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

