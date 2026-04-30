"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dashboard } from "@/components/dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const [isValidSession, setIsValidSession] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const validateSession = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn")
      const sessionInvalidated = localStorage.getItem("sessionInvalidated")
      const lastLoginTime = localStorage.getItem("lastLoginTime")

      // Check if session was invalidated (password changed)
      if (sessionInvalidated && lastLoginTime) {
        const invalidatedTime = parseInt(sessionInvalidated)
        const loginTime = parseInt(lastLoginTime)
        
        if (invalidatedTime > loginTime) {
          // Session was invalidated after login - force re-login
          localStorage.clear()
          sessionStorage.clear()
          router.push("/login")
          return
        }
      }

      if (isLoggedIn === "true") {
        setIsValidSession(true)
        setIsLoading(false)
      } else {
        router.push("/login")
      }
    }

    validateSession()

    // Listen for force logout from other tabs/windows
    const handleForceLogout = () => {
      localStorage.clear()
      sessionStorage.clear()
      router.push("/login")
    }

    window.addEventListener("forceLogout", handleForceLogout)
    return () => window.removeEventListener("forceLogout", handleForceLogout)
  }, [router])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isValidSession) {
    return null
  }

  return <Dashboard />
}
