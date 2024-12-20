import axios from "axios";
import { genaiConfig } from "@/types/genaiconfig";
import { genAiLocal } from "@/helper/localStorage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        if(genAiLocal()){
            const data:genaiConfig = JSON.parse(localStorage.getItem('genaiConfig')||'{}')
            const res= await axios.post(`${process.env.GENAI_API_URL}/configure`,data)
            if(res.status===200){
                console.log("Configured successfully")
                const {issue} = await req.json()
                const response = await axios.post(`${process.env.GENAI_API_URL}/recommendation/act`,issue)
                return NextResponse.json(response.data)
            }else{
                console.log("Failed to configure")
                return NextResponse.json({error:"to get GenAI help please configure AI param"})
            }
        }
    }
    catch(error){
        console.error(error)
        return NextResponse.json({error:"please try different model"})
    }
}