import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbCon/dbCon";
import EventAct from "@/models/eventModel";
import jwt from "jsonwebtoken";

connect().then(() => console.log("Database connected")).catch(err => console.error(err));

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token");
        const decoded = jwt.verify(token?.value, process.env.TOKEN_SECRET!);
        const body = await req.json();
        body.createdBy = decoded.id;
        const newEvent = await EventAct.create(body);
        return NextResponse.json({ message: "Event created successfully", event: newEvent }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const events = await EventAct.find();
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id , invitedFriends} = await body;
        const updatedEvent = await EventAct.find({_id:id}).updateOne({$push: {invitedFriends: invitedFriends}});
        return NextResponse.json({ message: "Event updated successfully", event: updatedEvent }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        await EventAct.findByIdAndDelete(id);
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
