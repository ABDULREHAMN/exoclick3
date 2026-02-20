"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PaymentContent } from "@/components/payment-content"

export default function PaymentsPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/login")
    }
  }, [router])

  return <PaymentContent />
}
