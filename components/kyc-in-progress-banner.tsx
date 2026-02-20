"use client"

import { Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useKyc } from "./kyc-context"

export function KycInProgressBanner() {
  const { kycStatus } = useKyc()

  // Only show the banner if KYC is pending (in process)
  if (kycStatus !== "pending") {
    return null
  }

  return (
    <Card className="p-4 bg-yellow-50 border-yellow-200 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-start">
          <Clock className="text-yellow-600 mr-3 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-yellow-800">KYC In Process</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Your KYC is currently under review. It will be completed within 5 to 6 business days.
            </p>
          </div>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Under Review</Badge>
      </div>
    </Card>
  )
}
