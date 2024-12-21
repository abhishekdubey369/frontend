import { ThemeProvider } from '@/contexts/ThemeContext'
import WeatherLog from '@/components/WeatherLog'
import DashboardMenu from '@/components/DashboardMenu'

export default function Home() {
  return (
    <div className='container mx-auto p-4'>
    <ThemeProvider>
      <main className="min-h-screen bg-background">
        <DashboardMenu />
        <WeatherLog />
      </main>
    </ThemeProvider>
    </div>
  )
}

