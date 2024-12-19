interface WeatherQuoteProps {
    weather: string | undefined
  }
  
  export default function WeatherQuote({ weather }: WeatherQuoteProps) {
    const getQuote = () => {
      if (!weather) return "The weather is a mystery, but life is an adventure."
  
      switch (weather.toLowerCase()) {
        case 'clear sky':
          return "Clear skies are like blank canvases, ready for you to paint your day."
        case 'few clouds':
        case 'scattered clouds':
          return "A few clouds in the sky are like thoughts in a clear mind - they come and go."
        case 'broken clouds':
        case 'overcast clouds':
          return "Even on cloudy days, the sun is still shining above."
        case 'rain':
        case 'light rain':
        case 'moderate rain':
          return "Rain is the earth's way of adding sparkle to the day."
        case 'thunderstorm':
          return "Thunderstorms remind us of the power and beauty of nature."
        case 'snow':
          return "Snowflakes are winter's butterflies."
        case 'mist':
        case 'fog':
          return "In the fog of life, take it slow and enjoy the mystery."
        default:
          return "Every type of weather is perfect for something."
      }
    }
  
    return (
      <div className="my-4 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Weather Quote</h3>
        <p className="italic">{getQuote()}</p>
      </div>
    )
  }
  
  