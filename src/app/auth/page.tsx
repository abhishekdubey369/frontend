"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Auth() {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [emailType, setEmailType] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const verifyEmail = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/api/users/verify", { token, emailType });
            if(res.status === 201){
            setVerified(true);
            setError("");}
            else{
                setError(res.data.error);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async () => {
        if (!password) {
            setError("Password is required");
            return;
        } else if (password.length < 9) {
            setError("Password must be at least 9 characters");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("/api/users/verify", { token, emailType, password });
            if(res.status === 201){
                setVerified(true);
                setError("");}else{
            setVerified(true);
            setError("");}
        } catch (err: any) {
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get("token");
        const emailTypeParam = urlParams.get("emailType");

        if (!tokenParam || !emailTypeParam) {
            setError("Invalid or missing token");
        } else {
            setToken(tokenParam);
            setEmailType(emailTypeParam);
        }
    }, []);

    useEffect(() => {
        if (emailType === "verify" && token) {
            verifyEmail();
        }
    }, [emailType, token]);

    return (
        <div className="container mx-auto mt-8">
            <Card className="p-6 max-w-md mx-auto">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {emailType === "verify" ? (
                    verified ? (
                        <div>
                            <h1 className="text-lg font-semibold mb-4">Email Verified</h1>
                            <Link href="/login">
                                <Button>Login</Button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-lg font-semibold mb-4">Verifying Email...</h1>
                            {loading && <p>Please wait...</p>}
                        </div>
                    )
                ) : (
                    <div>
                        {verified ? (
                            <div>
                                <h1 className="text-lg font-semibold mb-4">Password Reset Successfully</h1>
                                <Link href="/login">
                                    <Button>Login</Button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-lg font-semibold mb-4">Reset Password</h1>
                                <Input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mb-4"
                                />
                                <Button onClick={resetPassword} disabled={loading}>
                                    {loading ? "Resetting..." : "Reset Password"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}
