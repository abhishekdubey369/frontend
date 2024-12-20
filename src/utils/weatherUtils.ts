import { Theme } from '@/contexts/ThemeContext'

export function getWeatherQuote(theme: Theme): string {
  const quotes: Record<Theme, string> = {
    rainy: "The sound of rain needs no translation.",
    windy: "The wind whispers secrets to those who listen.",
    sunny: "A day without sunshine is like, you know, night.",
    cloudy: "Even the darkest clouds have silver linings.",
    dreamy: "In the mist, all of the world is mysterious.",
    fall: "Autumn shows us how beautiful it is to let things go.",
    spring: "Spring: nature's way of saying, 'Let's party!'",
    summer: "Summer afternoon—summer afternoon; to me those have always been the two most beautiful words in the English language.",
    winter: "Winter is not a season, it's a celebration.",
    love: "Love is like the wind, you can't see it but you can feel it."
  }
  return quotes[theme] || "Every weather is perfect weather."
}

export function getWeatherRecommendation(theme: Theme): string {
  const recommendations: Record<Theme, string> = {
    rainy: "Perfect day for indoor activities. How about reading a book or watching a movie?",
    windy: "Great weather for flying a kite or going for a scenic drive.",
    sunny: "Ideal conditions for outdoor activities. Consider going for a picnic or a hike.",
    cloudy: "Good day for photography or visiting museums.",
    dreamy: "Take a relaxing walk and enjoy the atmospheric conditions.",
    fall: "Go for a nature walk and enjoy the colorful foliage.",
    spring: "Plant some flowers or go for a bike ride.",
    summer: "Head to the beach or have a barbecue with friends.",
    winter: "Build a snowman or enjoy some hot cocoa by the fireplace.",
    love: "Plan a romantic outing or surprise your loved ones with a thoughtful gesture."
  }
  return recommendations[theme] || "Enjoy the day, regardless of the weather!"
}

