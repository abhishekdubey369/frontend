import { useState } from 'react'
import { WeatherData, Activity } from '@/types/weather'

interface ActivityPlannerProps {
  weather: WeatherData | null
  addActivity: (activity: Activity) => void
  activities: Activity[]
}

export default function ActivityPlanner({ weather, addActivity, activities }: ActivityPlannerProps) {
  const [activityName, setActivityName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activityName && weather) {
      addActivity({
        id: Date.now(),
        name: activityName,
        weather: weather.description,
        timestamp: new Date().toISOString(),
      })
      setActivityName('')
    }
  }

  const getRecommendation = () => {
    if (!weather) return 'Enter a city to get weather-based recommendations.'
    
    const temp = weather.temperature
    const description = weather.description.toLowerCase()

    if (temp > 25 && !description.includes('rain')) {
      return 'Great weather for outdoor activities! Consider going for a picnic or a hike.'
    } else if (description.includes('rain')) {
      return 'It might rain. Indoor activities like visiting a museum or watching a movie are recommended.'
    } else if (temp < 10) {
      return 'It\'s cold outside. How about a cozy indoor activity like reading a book or cooking a warm meal?'
    } else {
      return 'The weather is mild. It\'s a good day for various activities, both indoor and outdoor.'
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Activity Planner</h2>
      <p className="mb-4">{getRecommendation()}</p>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Enter activity name"
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add Activity
        </button>
      </form>
      <div className="space-y-2">
        {activities.map(activity => (
          <div key={activity.id} className="bg-white p-2 rounded">
            <p>{activity.name} - {activity.weather}</p>
            <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

