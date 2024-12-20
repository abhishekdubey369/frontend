import axios from "axios";
import { genaiConfig } from "@/types/genaiconfig";

export default async function genaiCon(data:genaiConfig) {
    try{
    const res= await axios.post(`${process.env.GENAI_API_URL}/configure`,data)
    if(res.status===200){
        console.log("Configured successfully")
        return true
    }else{
        console.log("Failed to configure")
        return false
    }
}
    catch(error){
        console.error(error)
    }
}