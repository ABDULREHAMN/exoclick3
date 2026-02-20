"use client"

import { Megaphone } from "lucide-react"
import { Card } from "@/components/ui/card"

export function NoCampaignsMessage() {
  return (
    <div className="p-6 flex items-center justify-center min-h-[calc(100vh-120px)]">
      <Card className="p-6 text-center max-w-md w-full space-y-4 bg-gray-50 border-gray-200">
        <Megaphone className="h-12 w-12 text-gray-500 mx-auto" />
        <h2 className="text-xl font-bold text-gray-800">No Active Campaigns</h2>
        <p className="text-sm text-gray-600">
          You are currently using a Publisher account. Campaign management is not available in this panel as no
          advertiser activity has been initiated. You can continue monitoring your earnings, traffic, and withdrawal
          history from the dashboard.
        </p>
      </Card>
    </div>
  )
}
