import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const tokenData = (req: NextRequest) => {
    try {
        const token = req.cookies.get("llm_config")?.value || '';
        const llm_config = jwt.verify(token, process.env.TOKEN_SECRET!);
        return llm_config;
    } catch (error:any) {
        throw new Error(error.message);
    }
}

export const authData = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || '';
        const auth:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return auth?.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}