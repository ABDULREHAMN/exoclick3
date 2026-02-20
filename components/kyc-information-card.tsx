"use client"

import { useState } from "react"
import { CheckCircle, Shield, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { KycDetailsModal } from "./kyc-details-modal"

export function KycInformationCard() {
  const [showKycDetails, setShowKycDetails] = useState(false)

  return (
    <>
      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-green-800 flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              KYC Status
            </h3>
            <Badge className="bg-green-500 text-white flex items-center">
              <CheckCircle size={12} className="mr-1" />
              Verified
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Full Name</div>
              <div className="font-medium">Motorist Michael, Matthew</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Document Type</div>
              <div className="font-medium">Driving License</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Verification Date</div>
              <div className="font-medium">February 16, 2026</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Reference ID</div>
              <div className="font-mono text-sm">#KYC2026-FEB16</div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md border border-green-200">
            <div className="text-sm text-gray-600 mb-2">Benefits</div>
            <ul className="text-sm space-y-1">
              <li className="flex items-center">
                <CheckCircle size={12} className="mr-2 text-green-500" />
                Unlimited withdrawals
              </li>
              <li className="flex items-center">
                <CheckCircle size={12} className="mr-2 text-green-500" />
                Priority processing
              </li>
              <li className="flex items-center">
                <CheckCircle size={12} className="mr-2 text-green-500" />
                Enhanced security
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center bg-transparent"
            onClick={() => setShowKycDetails(true)}
          >
            <Eye size={14} className="mr-2" />
            View Verification Details
          </Button>
        </div>
      </Card>

      <KycDetailsModal isOpen={showKycDetails} onClose={() => setShowKycDetails(false)} />
    </>
  )
}
