import { NextResponse } from 'next/server'

type WeatherCondition = 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'windy'

const activityRecommendations: Record<WeatherCondition, string[]> = {
  sunny: ['Go for a picnic', 'Visit a beach', 'Go hiking', 'Play outdoor sports'],
  rainy: ['Visit a museum', 'Watch a movie', 'Read a book', 'Cook a new recipe'],
  cloudy: ['Go for a walk', 'Visit a cafe', 'Go shopping', 'Do indoor rock climbing'],
  snowy: ['Go skiing', 'Build a snowman', 'Have a snowball fight', 'Go ice skating'],
  windy: ['Fly a kite', 'Go windsurfing', 'Have a bonfire', 'Go for a scenic drive']
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const weather = searchParams.get('weather') as WeatherCondition

  if (!weather || !activityRecommendations[weather]) {
    return NextResponse.json({ error: 'Invalid weather condition' }, { status: 400 })
  }

  const activities = activityRecommendations[weather]
  const randomActivity = activities[Math.floor(Math.random() * activities.length)]

  return NextResponse.json({ activity: randomActivity })
}

