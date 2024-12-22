import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbCon/dbCon";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect().then(() => console.log("Database connected")).catch(err => console.error(err));;

export async function POST(req:NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"user doesn't exist"},{status:400})
        }

        // compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json({error:"invalid credentials"},{status:400})
        }
        if(!user.isVerified){
            return NextResponse.json({error:"email not verified"},{status:400})
        }
        //create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        const Response = NextResponse.json({
            message: "login success",
            success: true,
        });
        Response.cookies.set("token", token, {
            httpOnly: true,
        })
        return Response;

    } catch (error:any) {
        return NextResponse.json({ error: error.message ,success:false, },{status:500});
    }
}