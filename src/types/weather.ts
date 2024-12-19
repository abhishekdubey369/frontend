export interface WeatherDataComplete {
    id: number
    name: string
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
      sea_level: number
      grnd_level: number
    }
    wind: {
      speed: number
      deg: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
  }
  
  export interface WeatherData {
    id: number
    city: string
    temperature: number
    pressure: number
    humidity: number
    windSpeed: number
    windDirection: number
    description: string
    icon: string
    timestamp: string
  }
  
  export type Theme = 'rainy' | 'windy' | 'sunny' | 'cloudy' | 'dreamy' | 'spring' | 'summer' | 'winter' | 'fall' | 'love'
  
  export interface Activity {
    id: number
    name: string
    weather: string
    timestamp: string
  }
  
  export interface Event {
    id: number
    name: string
    date: string
    weather: string
    ticketPrice?: number
    invitedFriends: string[]
    timestamp: string
  }
  
  