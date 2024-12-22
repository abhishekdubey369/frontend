import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbCon/dbCon";
import Activity from "@/models/activityModel";
import jwt from "jsonwebtoken";

connect().then(() => console.log("Database connected")).catch(err => console.error(err));

export async function POST(req: NextRequest) {
    try {
        const token:any = req.cookies.get("token");
        const decoded:any = jwt.verify(token?.value||"", process.env.TOKEN_SECRET!);
        const body = await req.json();
        body.createdBy = decoded.id;

        if (!body.activity || !body.activity.name || !body.activity.date) {
            throw new Error("Invalid activity data.");
        }

        const newActivity = await Activity.create(body);
        return NextResponse.json({ message: "Activity created successfully", event: newActivity }, { status: 201 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const token:any = req.cookies.get("token");
        const decoded:any = jwt.verify(token?.value||"", process.env.TOKEN_SECRET!);
        const activities = await Activity.find({createdBy:decoded.id});
        return NextResponse.json(activities, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Activity ID is required" }, { status: 400 });
        }
        await Activity.findByIdAndDelete(id);
        return NextResponse.json({ message: "Activity deleted successfully" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
