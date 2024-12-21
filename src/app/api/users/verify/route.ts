import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbCon/dbCon";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

connect()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token, emailType, password } = reqBody;

        if (!token || !emailType) {
            return NextResponse.json(
                { error: "Token and email type are required" },
                { status: 400 }
            );
        }

        let user;
        if (emailType === "verify") {
            user = await User.findOne({
                verifyToken: token,
                verifyTokenExpiry: { $gt: Date.now() },
            });

            if (!user) {
                return NextResponse.json(
                    { error: "Invalid or expired token" },
                    { status: 400 }
                );
            }

            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;

            await user.save();
            return NextResponse.json(
                { message: "Email verified successfully", success: true },
                { status: 200 }
            );
        } else if (emailType === "forgot") {
            if (!password || password.length < 6) {
                return NextResponse.json(
                    { error: "Password must be at least 6 characters long" },
                    { status: 400 }
                );
            }

            user = await User.findOne({
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: { $gt: Date.now() },
            });

            if (!user) {
                return NextResponse.json(
                    { error: "Invalid or expired token" },
                    { status: 400 }
                );
            }

            user.password = await bcryptjs.hash(password, 10);
            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpiry = undefined;

            await user.save();
            return NextResponse.json(
                { message: "Password reset successfully", success: true },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: "Invalid email type" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Error in POST handler:", error.message);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
