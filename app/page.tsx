"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true") {
      router.push("/publisher/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#1e2a38] flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  )
}
