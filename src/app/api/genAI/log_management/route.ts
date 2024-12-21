import axios from "axios";
import { genaiConfig } from "@/types/genaiconfig";
// import { genAiLocal } from "@/helper/localStorage";
import { NextRequest, NextResponse } from "next/server";
import { tokenData } from "@/helper/tokenData";

export async function POST(req:NextRequest){
    try{
        const llmData = await tokenData(req);
        if(llmData){
            const data:genaiConfig = llmData;
            //console.log("data",data)
            const res= await axios.post(`${process.env.GENAI_BACKEND}/configure`,data)
            if(res.status===200){
                //console.log("Configured successfully")
                const redata = await req.json()
                //console.log("issue",redata)
                const response = await axios.post(`${process.env.GENAI_BACKEND}/log_management/act`,redata)
                return NextResponse.json({
                    message:response.data,
                    success:true
                },
                {
                    status:200
                })
            }else{
                //console.log("Failed to configure")
                return NextResponse.json({error:"to get GenAI help please configure AI param"})
            }
        }
    }
    catch(error){
        //console.error(error)
        return NextResponse.json({error:"please try different model"})
    }
}