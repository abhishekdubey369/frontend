"use client";
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPassPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const onSent = async ()=>{
        try {
            const res = await axios.post("/api/users/forgot",{
                email: email
            })
            if(res.status === 201){
                setSuccess(res.data.message);
                useRouter().push("/login");
            }else{
                setError(res.data.error);
            }
        } catch (error: any) {
            setError(error.response.data.error);
        }
    }
    return (
        <div className="container mx-auto p-4">
            <Card>
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Button onClick={onSent}>Send Reset Mail</Button>
                {error && <p className="text-red-500">{error}</p>}
            </Card>
        </div>
    )
}