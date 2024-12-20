'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'rainy' | 'windy' | 'sunny' | 'cloudy' | 'dreamy' | 'fall' | 'spring' | 'summer' | 'winter' | 'love'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('sunny')

  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

