"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NeverBlockPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">NeverBlock</h1>
      <p className="text-gray-600">NeverBlock content coming soon.</p>
    </div>
  )
}
