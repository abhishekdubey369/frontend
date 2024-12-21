import { ThemeProvider } from '@/contexts/ThemeContext'
import WeatherLog from '@/components/WeatherLog'
import DashboardMenu from '@/components/DashboardMenu'

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background">
        <DashboardMenu />
        <WeatherLog />
      </main>
    </ThemeProvider>
  )
}

