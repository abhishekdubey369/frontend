import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req:NextRequest) {
    const reqBody = await req.json();
    const {llm_type,api_key,model} = reqBody;
    const tokenData = {
        llm_type,
        api_key,
        model
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

    const response = NextResponse.json({
        message: "config saved",
        success: true,
    },{
        status: 200
    })
    response.cookies.set("llm_config", token, {
        httpOnly: true,
    })

    return response;
}