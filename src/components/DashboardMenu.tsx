'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function DashboardMenu() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Weather Log', path: '/weather_log' },
    { label: 'Activity Scheduler', path: '/activity_scheduler' },
    { label: 'Event Scheduler', path: '/event_scheduler' },
    { label: 'Logout', path: '/logout' },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  return (
    <nav className="mb-4">
      <div className="sm:hidden">
        <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
        {isMenuOpen && (
          <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="hidden sm:flex sm:space-x-2">
        {menuItems.map((item) => (
          <Button key={item.path} onClick={() => handleNavigation(item.path)}>
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  )
}

