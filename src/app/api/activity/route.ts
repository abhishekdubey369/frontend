import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbCon/dbCon";
import Activity from "@/models/activityModels";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect().then(() => console.log("Database connected")).catch(err => console.error(err));;

export async function POST(req:NextRequest) {
    try {
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message },{status:500});
        
    }
}

export async function GET(req:NextRequest) {
    try {
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message },{status:500});
    }
}