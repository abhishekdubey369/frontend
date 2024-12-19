import { WeatherData } from '@/types/weather'

interface WeatherLogProps {
  logs: WeatherData[]
  deleteLog: (id: number) => void
}

export default function WeatherLog({ logs, deleteLog }: WeatherLogProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Weather Log History</h2>
      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{log.city}</h3>
              <button
                onClick={() => deleteLog(log.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p>Temperature: {log.temperature}°C</p>
            <p>Pressure: {log.pressure} hPa</p>
            <p>Humidity: {log.humidity}%</p>
            <p>Wind: {log.windSpeed} m/s, {log.windDirection}°</p>
            <p>Description: {log.description}</p>
            <p>Logged at: {new Date(log.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

