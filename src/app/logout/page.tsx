"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
export default function Logout() {

    const router = useRouter()

    const handleLogout = async () => {
        const res = await axios.get('/api/users/logout')
        if (res.data.success) {
            localStorage.clear();
            router.push('/llm_config')
        }
        else{
            alert("Logout failed")
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}