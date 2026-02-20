"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteZoneContent } from "@/components/site-zone-content"

export default function SitesZonesPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/login")
    }
  }, [router])

  return <SiteZoneContent />
}
