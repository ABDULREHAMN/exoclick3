"use client"

import { AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useKyc } from "./kyc-context"

export function KycAlert() {
  const { kycStatus, startKyc } = useKyc()

  // Only show the alert if KYC is not started or rejected
  if (kycStatus === "verified" || kycStatus === "pending") {
    return null
  }

  return (
    <Card className="p-4 bg-red-100 border border-red-400 text-red-700 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-lg mb-1">KYC Required to Withdraw</h3>
          <p className="text-sm">
            KYC (Know Your Customer) verification is mandatory to process any withdrawals. Without completing KYC, your
            payment requests will remain blocked. Please verify your identity by uploading valid documents and
            completing face verification.
          </p>
          <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white" onClick={startKyc}>
            Start KYC Verification
          </Button>
        </div>
      </div>
    </Card>
  )
}
