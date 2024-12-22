import axios from "axios"
export const fetchActivityRecommendation = async (weather: string,city:string): Promise<string> => {
    const dataSent:{
        "city": string,
        "weather": string
    }={
        "city": city,
        "weather": weather
    }
    try {
        const response = await axios.post('/api/genAI/recommendation',dataSent)
        const data = await response.data
        console.log(data)
        if(data.success){
            // console.log(data)
            return data.message.activity
        }
        // console.log(response)
        return JSON.stringify(data.message)
    } catch (error:any) {
        const response = await axios.get('/api/genAI/recommendation/recommend?weather='+weather)
        const data = response.data
        return data.activity
    }
  }

export const fetchSummary = async (weather: string,city:string): Promise<string> => {
    const dataSent:{
        "city": string,
        "weather": string
    }={
        "city": city,
        "weather": weather
    }
    try {
        const response = await axios.post('/api/genAI/summary',dataSent)
        const data = await response.data
        console.log(data)
        if(data.success){
            // console.log(data)
            return JSON.stringify(data.message.response)
        }
        // console.log(response)
        return JSON.stringify(data)
    } catch (error:any) {
        const response = await axios.get('/api/genAI/recommendation/recommend?weather='+weather)
        const data = response.data
        return data.activity
    }
  }