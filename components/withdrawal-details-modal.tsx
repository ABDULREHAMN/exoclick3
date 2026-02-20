"use client"

import { CheckCircle, Clock, Download, ShieldCheck, Mail, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"

export interface WithdrawalDetails {
  id: string
  date: string
  amount: string
  method: string
  status: "Pending" | "Completed"
  account: string
  processingTime?: string
  expectedDate?: string
  completedDate?: string
  grossAmount?: string
  tax?: string
}

interface WithdrawalDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  withdrawal: WithdrawalDetails | null
  allWithdrawals?: WithdrawalDetails[]
}

export function WithdrawalDetailsModal({ withdrawal, isOpen, onClose }: WithdrawalDetailsModalProps) {
  const [qrCodeData, setQrCodeData] = useState<string>("")

  useEffect(() => {
    if (withdrawal) {
      const verificationData = {
        id: withdrawal.id,
        amount: withdrawal.amount,
        date: withdrawal.date,
        account: withdrawal.account,
        timestamp: Date.now(),
      }
      const hashData = btoa(JSON.stringify(verificationData))
      setQrCodeData(`https://dashboard.exoclick.com/verify-invoice?data=${hashData}`)
    }
  }, [withdrawal])

  const isPending = withdrawal?.status === "Pending"
  const isCompleted = withdrawal?.status === "Completed"

  const handleDownloadPDF = () => {
    if (!withdrawal) return

    const receiptContent = `
PAYMENT INVOICE
Ad Network Publisher Payout System
======================================

INVOICE NUMBER: ${withdrawal.id}
INVOICE DATE: ${withdrawal.date}
STATUS: ${withdrawal.status}

BILLED TO:
Account Holder: Abdul Rehman
Email: ${withdrawal.account}
Payment Method: ${withdrawal.method}
Account Status: Verified

PAYOUT DETAILS:
Withdrawal Amount: ${withdrawal.amount}
Currency: USD
Processing Time: 8–10 business days
Processing Type: Manual Review
Withdrawal Schedule: Withdrawals are processed twice per month only (12th and 25th)
Next Withdrawal Date: January 12, 2026

TRANSACTION TIMELINE:
✓ Withdrawal Requested - ${withdrawal.date}
✓ Under Review
${isCompleted ? "✓" : "⏱"} Sent to Payoneer
${isCompleted ? "✓" : "⏱"} Funds Received${isCompleted ? " - " + withdrawal.completedDate : ""}

REFERENCE INFORMATION:
Reference ID: ${withdrawal.id}
Payment Channel: Payoneer Mass Payout
Internal Note: Secure publisher payout

INVOICE SUMMARY:
Gross Amount: ${withdrawal.grossAmount}
Withholding Tax (5%): -${withdrawal.tax}
Fees: $0.00
Net Amount Paid: ${withdrawal.amount}

TAX & WITHHOLDING INFORMATION:
Withholding Tax Rate: 5%
Tax Amount: ${withdrawal.tax}
Description: A 5% withholding tax is deducted from this withdrawal before payout.

NOTES:
- This is a system-generated invoice.
- All payments are securely processed via Payoneer.
- Invoice is digitally verifiable using the QR code.
- For support, contact: support@exoclick.com

======================================
Generated on ${new Date().toLocaleString()}
This invoice is digitally signed and verified.
    `.trim()

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Invoice-${withdrawal.id}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    handleEmailInvoice()
  }

  const handleEmailInvoice = () => {
    if (!withdrawal) return

    const emailData = {
      to: withdrawal.account,
      subject: `Your Withdrawal Invoice – ${withdrawal.id}`,
      from: "Publisher Payments <payments@exoclick.com>",
      body: {
        header: "Withdrawal Invoice",
        greeting: "Hello Abdul Rehman,",
        messages: [
          "Your withdrawal has been processed successfully.",
          "Please find your invoice details attached.",
          `Amount: ${withdrawal.amount}`,
          `Status: ${withdrawal.status}`,
          `Date: ${withdrawal.date}`,
        ],
        footer: [`Payment Method: ${withdrawal.method}`, "Thank you for working with us."],
      },
      attachment: {
        type: "PDF",
        filename: `Invoice-${withdrawal.id}.pdf`,
      },
    }

    console.log("[v0] Email invoice triggered:", emailData)
    // In production, this would call an API endpoint
    // fetch('/api/send-invoice-email', { method: 'POST', body: JSON.stringify(emailData) })
  }

  const timelineSteps = [
    {
      step: "Withdrawal Requested",
      status: "Completed",
      date: withdrawal?.date,
    },
    {
      step: "Under Review",
      status: isCompleted ? "Completed" : "Completed",
      date: null,
    },
    {
      step: "Sent to Payoneer",
      status: isCompleted ? "Completed" : isPending ? "Pending" : "Completed",
      date: null,
    },
    {
      step: "Funds Received",
      status: isCompleted ? "Completed" : "Pending",
      date: isCompleted ? withdrawal.completedDate : null,
    },
  ]

  const bgColor = "bg-white"
  const cardBg = "bg-slate-50"
  const textPrimary = "text-slate-900"
  const textSecondary = "text-slate-600"
  const borderColor = "border-slate-200"
  const accentBg = "bg-slate-100"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${bgColor}`}>
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white -mx-6 -mt-6 px-6 py-5 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold tracking-tight">Withdrawal Invoice</DialogTitle>
              <p className="text-sm text-blue-100 font-medium">Official Publisher Payout</p>
            </div>
          </div>
        </DialogHeader>

        {withdrawal && (
          <div className="space-y-6 pt-2">
            <div className={`${cardBg} rounded-xl p-5 space-y-3 border ${borderColor}`}>
              <h3 className={`text-sm font-semibold ${textSecondary} uppercase tracking-wide mb-3`}>
                Invoice Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Invoice Number</div>
                  <div className={`font-bold ${textPrimary} text-base`}>{withdrawal.id}</div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Invoice Date</div>
                  <div className={`font-bold ${textPrimary} text-base`}>{withdrawal.date}</div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Status</div>
                  <Badge
                    className={`font-semibold px-3 py-1 ${
                      isCompleted
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-amber-500 text-white hover:bg-amber-600"
                    }`}
                  >
                    {withdrawal.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-base font-bold ${textPrimary} pb-3 border-b-2 ${borderColor}`}>Billed To</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Account Holder</div>
                  <div className={`font-semibold ${textPrimary}`}>Abdul Rehman</div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Email</div>
                  <div className={`font-semibold ${textPrimary} text-sm break-all`}>{withdrawal.account}</div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Payment Method</div>
                  <div className={`font-semibold ${textPrimary}`}>{withdrawal.method}</div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Account Status</div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-semibold text-green-600">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-base font-bold ${textPrimary} pb-3 border-b-2 ${borderColor}`}>Payout Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className={`col-span-2 ${accentBg} border-l-4 border-blue-600 rounded-lg p-4`}>
                  <div className={`text-xs text-blue-700 uppercase tracking-wide mb-1 font-semibold`}>
                    Withdrawal Amount
                  </div>
                  <div className={`font-bold text-blue-900 text-2xl`}>{withdrawal.amount}</div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Currency</div>
                  <div className={`font-semibold ${textPrimary}`}>USD</div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Processing Time</div>
                  <div className={`font-semibold ${textPrimary}`}>8–10 business days</div>
                </div>
                <div className="col-span-2">
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Processing Type</div>
                  <div className={`font-semibold ${textPrimary}`}>Manual Review</div>
                </div>
                <div className="col-span-2">
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Withdrawal Schedule</div>
                  <div className={`font-semibold ${textPrimary}`}>
                    Withdrawals are processed twice per month only. Available withdrawal dates are the 12th and 25th.
                  </div>
                </div>
                <div className="col-span-2">
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Next Withdrawal Date</div>
                  <div className={`font-semibold ${textPrimary}`}>January 12, 2026</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-base font-bold ${textPrimary} pb-3 border-b-2 ${borderColor}`}>
                Transaction Timeline
              </h3>
              <div className="space-y-4 pl-2">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-0.5">
                      {step.status === "Completed" ? (
                        <div className="rounded-full bg-green-500 p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      ) : step.status === "Pending" ? (
                        <div className="rounded-full bg-amber-500 p-1">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className={`rounded-full bg-slate-300 p-1`}>
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`flex-1 pb-4 border-l-2 ${borderColor} pl-6 -ml-3.5`}
                      style={index === timelineSteps.length - 1 ? { borderLeft: "none" } : {}}
                    >
                      <div className={`font-semibold ${textPrimary} mb-1`}>{step.step}</div>
                      {step.date && <div className={`text-xs ${textSecondary} mb-2`}>{step.date}</div>}
                      <Badge
                        className={`text-xs font-medium ${
                          step.status === "Completed"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : step.status === "Pending"
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                              : `${accentBg} ${textSecondary} hover:${accentBg}`
                        }`}
                      >
                        {step.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-base font-bold ${textPrimary} pb-3 border-b-2 ${borderColor}`}>
                Reference Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Reference ID</div>
                  <div className={`font-mono font-semibold ${textPrimary} text-sm ${accentBg} px-3 py-1.5 rounded`}>
                    {withdrawal.id}
                  </div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Payment Channel</div>
                  <div className={`font-semibold ${textPrimary}`}>Payoneer Mass Payout</div>
                </div>
                <div className="col-span-2">
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Internal Note</div>
                  <div className={`font-semibold ${textPrimary}`}>Secure publisher payout</div>
                </div>
              </div>
            </div>

            <div className={`${cardBg} rounded-xl p-5 space-y-4 border ${borderColor}`}>
              <h3 className={`text-sm font-semibold ${textSecondary} uppercase tracking-wide mb-3`}>
                Tax & Withholding Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Withholding Tax Rate</div>
                  <div className={`font-semibold ${textPrimary}`}>5%</div>
                </div>
                <div>
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Tax Amount</div>
                  <div className={`font-semibold ${textPrimary}`}>{withdrawal.tax}</div>
                </div>
                <div className="col-span-2">
                  <div className={`text-xs ${textSecondary} uppercase tracking-wide mb-1.5`}>Description</div>
                  <div className={`font-semibold ${textPrimary}`}>
                    A 5% withholding tax is deducted from this withdrawal before payout.
                  </div>
                </div>
              </div>
            </div>

            <div className={`${cardBg} rounded-xl p-5 space-y-3 border ${borderColor}`}>
              <h3 className={`text-sm font-semibold ${textSecondary} uppercase tracking-wide mb-3`}>Invoice Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`${textSecondary} font-medium`}>Gross Amount</span>
                  <span className={`font-semibold ${textPrimary}`}>{withdrawal.grossAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${textSecondary} font-medium`}>Withholding Tax (5%)</span>
                  <span className={`font-semibold ${textPrimary}`}>-{withdrawal.tax}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${textSecondary} font-medium`}>Fees</span>
                  <span className={`font-semibold ${textPrimary}`}>$0.00</span>
                </div>
                <div className={`flex justify-between items-center pt-3 border-t-2 ${borderColor}`}>
                  <span className={`font-bold ${textPrimary} text-base`}>Net Amount Paid</span>
                  <span className={`font-bold text-blue-600 text-xl`}>{withdrawal.amount}</span>
                </div>
              </div>
            </div>

            <div className={`${accentBg} border-blue-500 border-l-4 rounded-lg p-5 space-y-4`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="h-5 w-5 text-blue-600" />
                    <h3 className={`text-sm font-bold text-blue-900 uppercase tracking-wide`}>Invoice Verification</h3>
                  </div>
                  <ul className={`space-y-2.5 text-sm text-blue-900`}>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>This invoice is digitally signed and verifiable.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Scan QR code to verify authenticity.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span className="break-all text-xs font-mono">{qrCodeData.substring(0, 50)}...</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-slate-900" />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${accentBg} border-blue-500 border-l-4 rounded-lg p-5 space-y-3`}>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <h3 className={`text-sm font-bold text-blue-900 uppercase tracking-wide`}>Important Information</h3>
              </div>
              <ul className={`space-y-2.5 text-sm text-blue-900`}>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>This is a system-generated invoice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>All payments are securely processed via Payoneer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Invoice is digitally verifiable using the QR code.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className={`flex justify-end gap-3 pt-6 border-t-2 ${borderColor} mt-2`}>
          <Button
            onClick={handleEmailInvoice}
            variant="outline"
            className={`font-semibold px-6 border-slate-300 hover:bg-slate-50 text-slate-600`}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Invoice
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 shadow-sm`}
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className={`font-semibold px-6 border-slate-300 hover:bg-slate-50 bg-transparent`}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
