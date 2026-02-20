"use client"

import { Wallet, Mail, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface PaymentMethodCardProps {
  type: string
  details: string
  network: string
  limit: string
  isDefault: boolean
  isVerified?: boolean
}

export function PaymentMethodCard({ type, details, network, limit, isDefault, isVerified }: PaymentMethodCardProps) {
  return (
    <Card className="p-4 relative hover:shadow-md transition-shadow">
      {isDefault && <Badge className="absolute top-2 right-2 bg-green-500">Default</Badge>}
      <div className="flex items-center mb-4">
        {type.includes("USDT") ? <Wallet className="mr-3" size={24} /> : <Mail className="mr-3" size={24} />}
        <h3 className="font-medium">{type}</h3>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-2">
          <span>{details}</span>
          {isVerified && (
            <Badge className="bg-green-100 text-green-800 text-xs flex items-center">
              <CheckCircle size={10} className="mr-1" />
              Verified
            </Badge>
          )}
        </div>
        <div className="text-xs mt-1">{network}</div>
        <div className="text-xs mt-1 font-medium text-green-600">{limit}</div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        {!isDefault && (
          <Button variant="outline" size="sm">
            Set Default
          </Button>
        )}
      </div>
    </Card>
  )
}
