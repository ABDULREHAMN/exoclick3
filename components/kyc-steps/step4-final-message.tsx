"use client"

import { Clock } from "lucide-react"
import { useKyc } from "../kyc-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Step4FinalMessage() {
  const { submitKyc } = useKyc()

  return (
    <Card className="p-4 bg-yellow-50 border-yellow-200 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-start">
          <Clock className="text-yellow-600 mr-3 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium text-yellow-800">KYC In Process</h3>
            <p className="text-sm text-yellow-700 mt-1">You will be notified once verification is complete.</p>
          </div>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Under Review</Badge>
      </div>
    </Card>
  )
}
