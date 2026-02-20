"use client"

import { Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useKyc } from "./kyc-context"

export function KycBanner() {
  const { kycStatus, startKyc } = useKyc()

  if (kycStatus === "verified") {
    return null
  }

  return (
    <Card className="p-4 bg-blue-50 border-blue-200 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-start">
          <Lock className="text-blue-600 mr-3 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-blue-800">Identity Verification Required</h3>
            <p className="text-sm text-blue-700 mt-1">
              {kycStatus === "pending"
                ? "Your KYC has been submitted successfully and is under review. Estimated processing time: 5–6 business days. You will receive an email once verification is completed."
                : "You must complete CNIC upload and face scan to enable withdrawals."}
            </p>
          </div>
        </div>
        {kycStatus === "pending" ? (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={startKyc}>
            Complete KYC
          </Button>
        )}
      </div>
    </Card>
  )
}
