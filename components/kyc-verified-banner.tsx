"use client"

import { CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useKyc } from "./kyc-context"

export function KycVerifiedBanner() {
  const { kycStatus, verificationDate } = useKyc()

  // Only show the banner if KYC is verified
  if (kycStatus !== "verified") {
    return null
  }

  return (
    <Card className="p-4 bg-green-50 border-green-200 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-start">
          <CheckCircle className="text-green-600 mr-3 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-green-800">Identity Verified</h3>
            <p className="text-sm text-green-700 mt-1">
              Your identity has been successfully verified on {verificationDate}. You can now withdraw funds without
              restrictions.
            </p>
          </div>
        </div>
        <Badge className="bg-green-500 text-white">
          <CheckCircle size={12} className="mr-1" />
          Verified
        </Badge>
      </div>
    </Card>
  )
}
