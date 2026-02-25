"use client"

import { Check, Copy, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip" // Ensure Tooltip components are imported

export function WithdrawalHistory() {
  const withdrawals = [
    {
      date: "25 Feb 2026",
      method: "Payoneer",
      amount: 544.52,
      status: "pending",
      details: "abdul.rehman.soashraf@gmail.com",
      isVerified: true,
      grossAmount: 573.18,
      fee: 28.66,
      processingTime: "8-10 days",
    },
    {
      date: "June 1",
      method: "Crypto (BEP20)",
      amount: 550.0,
      status: "confirmed",
      details: "0xb9cE52416d589bCe1AdCd02021BAe4D14202706B",
      isVerified: true,
    },
    {
      date: "June 13",
      method: "PayPal",
      amount: 150.0,
      status: "confirmed",
      details: "rohanjanean56@gmail.com",
      isVerified: true,
    },
    {
      date: "June 22",
      method: "Daily Earnings",
      amount: 358.33,
      status: "confirmed",
      details: "System Generated",
      isVerified: true,
    },
  ]

  const totalWithdrawn = withdrawals.reduce((sum, withdrawal) => sum + withdrawal.amount, 0)

  return (
    <Card className="p-4">
      <h2 className="text-lg font-medium mb-4">Withdrawal History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Method</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Address / Email</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal, index) => (
              <WithdrawalRow
                key={index}
                date={withdrawal.date}
                method={withdrawal.method}
                amount={`$${withdrawal.amount.toFixed(2)}`}
                status={withdrawal.status as "withdrawn" | "scheduled" | "failed" | "confirmed" | "pending"}
                details={withdrawal.details}
                isVerified={withdrawal.isVerified}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right text-lg font-semibold">
        Total Withdrawn: <span className="text-green-600">${totalWithdrawn.toFixed(2)}</span>
      </div>
    </Card>
  )
}

interface WithdrawalRowProps {
  date: string
  method: string
  amount: string
  status: "withdrawn" | "scheduled" | "failed" | "confirmed"
  details: string
  isVerified?: boolean
}

function WithdrawalRow({ date, method, amount, status, details, isVerified }: WithdrawalRowProps) {
  const statusConfig = {
    withdrawn: { icon: Check, color: "text-green-500 bg-green-50", label: "Withdrawn" },
    confirmed: { icon: CheckCircle, color: "text-green-500 bg-green-50", label: "Confirmed" },
    scheduled: { icon: Clock, color: "text-yellow-500 bg-yellow-50", label: "Pending" },
    failed: { icon: AlertTriangle, color: "text-red-500 bg-red-50", label: "Failed" },
  }

  const StatusIcon = statusConfig[status].icon

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm font-medium">{method}</td>
      <td className="py-3 px-4 text-sm font-medium">{amount}</td>
      <td className="py-3 px-4">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusConfig[status].color}`}>
          <StatusIcon size={12} className="mr-1" />
          <span>{statusConfig[status].label}</span>
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
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(details)}>
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
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(details)}>
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
