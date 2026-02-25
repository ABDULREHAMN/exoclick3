"use client"

import { Check, Copy, CheckCircle, Clock, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WithdrawalRowProps {
  date: string
  method: string
  amount: string
  status: "withdrawn" | "scheduled" | "failed" | "confirmed" | "refunded" | "pending"
  details: string
  isVerified?: boolean
  note?: string
  onRowClick?: () => void
}

export function WithdrawalRow({
  date,
  method,
  amount,
  status,
  details,
  isVerified,
  note,
  onRowClick,
}: WithdrawalRowProps) {
  const statusConfig = {
    withdrawn: {
      icon: Check,
      color: "text-green-500 bg-green-50",
      label: "Withdrawn",
    },
    confirmed: {
      icon: CheckCircle,
      color: "text-green-500 bg-green-50",
      label: "Confirmed",
    },
    pending: {
      icon: Clock,
      color: "text-orange-500 bg-orange-50",
      label: "Pending — 8-10 days",
    },
    scheduled: {
      icon: Clock,
      color: "text-yellow-500 bg-yellow-50",
      label: "Pending — 48–72 hours",
    },
    failed: {
      icon: AlertTriangle,
      color: "text-red-500 bg-red-50",
      label: "Failed",
    },
    refunded: {
      icon: X,
      color: "text-gray-500 bg-gray-50",
      label: "Refunded",
    },
  }

  const currentStatus = statusConfig[status] || statusConfig.scheduled
  const StatusIcon = currentStatus.icon

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <tr className="border-b hover:bg-gray-50 cursor-pointer" onClick={onRowClick}>
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm font-medium">{method}</td>
      <td className="py-3 px-4 text-sm font-medium">{amount}</td>
      <td className="py-3 px-4">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${currentStatus.color}`}>
          <StatusIcon size={12} className="mr-1" />
          <span>{currentStatus.label}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm">
        {details.startsWith("0x") ? (
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs">
              {details.slice(0, 10)}...{details.slice(-8)}
            </span>
            {isVerified && (
              <Badge className="bg-green-100 text-green-800 text-xs flex items-center">
                <CheckCircle size={10} className="mr-1" />
                Verified
              </Badge>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(details)
                    }}
                  >
                    <Copy size={12} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy wallet address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{details}</span>
            {isVerified && (
              <Badge className="bg-green-100 text-green-800 text-xs flex items-center">
                <CheckCircle size={10} className="mr-1" />
                Verified
              </Badge>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(details)
                    }}
                  >
                    <Copy size={12} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy email address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </td>
    </tr>
  )
}
