import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbCon/dbCon";
import WeatherLog from "@/models/weatherLogModel";
import jwt from "jsonwebtoken";

connect().then(() => console.log("Database connected")).catch(err => console.error(err));

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const decoded:any = jwt.verify(token?.value, process.env.TOKEN_SECRET!);
    const body = await req.json();
    body.createdBy = decoded.id;

    const newWeatherLog = await WeatherLog.create(body);
    return NextResponse.json(newWeatherLog, { status: 201 });
  } catch (error: any) {
    console.error("Error creating weather log:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const weatherLogs = await WeatherLog.find();
    // console.log(weatherLogs);
    const mappedLogs = weatherLogs.map((log) => ({
      ...log.toJSON(),
      id: log.id,
    }));
    // console.log(mappedLogs);
    return NextResponse.json(mappedLogs, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching weather logs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required to delete weather log" }, { status: 400 });
    }

    await WeatherLog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Weather log deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting weather log:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
