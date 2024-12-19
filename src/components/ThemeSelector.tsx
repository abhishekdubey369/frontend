import { Theme } from '@/types/weather'

interface ThemeSelectorProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export default function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  const themes: Theme[] = ['rainy', 'windy', 'sunny', 'cloudy', 'dreamy', 'spring', 'summer', 'winter', 'fall', 'love']

  return (
    <div className="mb-4">
      <label htmlFor="theme-select" className="mr-2">Choose a theme:</label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="p-2 border rounded"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}

