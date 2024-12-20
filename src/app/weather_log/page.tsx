import { ThemeProvider } from '@/contexts/ThemeContext'
import WeatherLog from '@/components/WeatherLog'

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background">
        <WeatherLog />
      </main>
    </ThemeProvider>
  )
}

