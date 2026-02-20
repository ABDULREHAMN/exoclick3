"use client"

import { Copy, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { KycModal } from "./kyc-modal" // Import the KYC modal
import { useKyc } from "./kyc-context" // Import the KYC context

export default function StandaloneWithdrawalHistory() {
  const { startKyc } = useKyc() // Get the startKyc function from context

  const withdrawals = [
    {
      date: "May 25",
      method: "Crypto (BEP20)",
      amount: 191.87,
      status: "confirmed",
      details: "0xb9cE52416d589bCe1AdCd02021BAe4D14202706B",
      isVerified: true,
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
      date: "June 12",
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
  ]

  return (
    <div className="p-6 space-y-6 bg-[#f5f5f5] min-h-screen">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Withdraw History</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Address / Email</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal, index) => (
                <WithdrawalRow
                  key={index}
                  date={withdrawal.date}
                  method={withdrawal.method}
                  amount={`$${withdrawal.amount.toFixed(2)}`}
                  status={withdrawal.status as "withdrawn" | "scheduled" | "failed" | "confirmed"}
                  details={withdrawal.details}
                  isVerified={withdrawal.isVerified}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* KYC Modal Trigger Button */}
        <Button onClick={startKyc} className="bg-blue-600 text-white px-4 py-2 rounded">
          Start KYC Verification
        </Button>
        {/* Optional Direct KYC Page Link */}
        <a
          href="https://example.com/kyc-form"
          target="_blank"
          className="mt-2 inline-block text-sm text-blue-700 underline"
          rel="noreferrer"
        >
          Or click here to open full KYC form
        </a>
      </Card>

      {/* Render the KYC Modal */}
      <KycModal />
    </div>
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
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <tr>
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2">{method}</td>
      <td className="px-4 py-2">{amount}</td>
      <td className={`px-4 py-2 ${status === "confirmed" ? "text-green-600 font-semibold" : ""}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </td>
      <td className="px-4 py-2">
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
