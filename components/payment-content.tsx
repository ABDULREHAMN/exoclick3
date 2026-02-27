"use client"
import { useState, useEffect } from "react"
import {
  Wallet,
  Mail,
  Building2,
  FileText,
  Download,
  CreditCard,
  Eye,
  Pencil,
  Trash2,
  Star,
  GripVertical,
  X,
  Plus,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useKyc } from "@/components/kyc-context"
import { KycPromptModal } from "./kyc-prompt-modal"
import { WithdrawalDetailsModal, type WithdrawalDetails } from "./withdrawal-details-modal"

interface PaymentMethodData {
  id: string
  type: "payoneer" | "bank" | "crypto"
  accountHolderName: string
  email: string
  country: string
  currency: string
  status: "Active" | "Pending Approval" | "Inactive"
  isDefault: boolean
  priority: number
  addedDate: string
}

interface PaymentContentProps {
  onNavigate: () => void
}

export function PaymentContent({ onNavigate }: PaymentContentProps) {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("payoneer")
  const [paypalEmail, setPaypalEmail] = useState("")
  const [payoneerEmail, setPayoneerEmail] = useState("")
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalDetails | null>(null)
  const [showWithdrawalDetails, setShowWithdrawalDetails] = useState(false)
  const [showBankTransferConfirmation, setShowBankTransferConfirmation] = useState(false)
  const [selectedPaymentEntry, setSelectedPaymentEntry] = useState<any>(null)
  const { kycStatus, openKycPromptModal } = useKyc()

  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalDetails[]>([
    {
      id: "wd-25feb",
      date: "25 Feb 2026",
      method: "Payoneer",
      amount: "$544.52",
      status: "Pending",
      details: "abdul.rehman.soashraf@gmail.com",
      grossAmount: "$573.18",
      fee: "$28.66",
      feePercentage: 5,
      processingTime: "8-10 days",
    },
  ])

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodData[]>([
    {
      id: "pm-1",
      type: "payoneer",
      accountHolderName: "Abdul Rehman",
      email: "abdul.rehman.soashraf@gmail.com",
      country: "Pakistan",
      currency: "USD",
      status: "Active",
      isDefault: true,
      priority: 1,
      addedDate: "Feb 11, 2026",
    },
  ])

  const [showAddMethodModal, setShowAddMethodModal] = useState(false)
  const [showEditMethodModal, setShowEditMethodModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showViewMethodPage, setShowViewMethodPage] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodData | null>(null)
  const [addMethodStep, setAddMethodStep] = useState(1)

  const [formData, setFormData] = useState({
    type: "" as "payoneer" | "bank" | "crypto" | "",
    accountHolderName: "",
    email: "",
    country: "",
    currency: "USD",
    confirmChecked: false,
  })

  useEffect(() => {
    const checkPendingWithdrawals = () => {
      const now = new Date()
      const updatedHistory = withdrawalHistory.map((withdrawal) => {
        if (withdrawal.status === "Pending" && withdrawal.method === "Payoneer") {
          const withdrawalDate = new Date(withdrawal.date)
          const daysPassed = Math.floor((now.getTime() - withdrawalDate.getTime()) / (1000 * 60 * 60 * 24))

          if (daysPassed >= 8) {
            // Auto-complete after 8 days
            const completedDate = new Date(withdrawalDate)
            completedDate.setDate(completedDate.getDate() + 8)

            return {
              ...withdrawal,
              status: "Completed" as const,
              completedDate: completedDate.toISOString().split("T")[0],
            }
          }
        }
        return withdrawal
      })

      // Check if any status changed
      const hasChanges = updatedHistory.some((w, i) => w.status !== withdrawalHistory[i].status)
      if (hasChanges) {
        setWithdrawalHistory(updatedHistory)
        // System notification (no UI change, just console log)
        console.log("[v0] Your Payoneer withdrawal has been completed successfully.")
      }
    }

    // Check on mount and every hour
    checkPendingWithdrawals()
    const interval = setInterval(checkPendingWithdrawals, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [withdrawalHistory])

  const availableBalance = 245.54
  const pendingBalance = 544.52
  const totalEarnings = 742.34
  const totalPayments = 742
  const thisMonthEarnings = 742.76
  const nextWithdrawalDate = "12 Mar 2026"

  const paymentEntries = []

  const recentActivity = []

  const handleAmountChange = (value: string) => {
    setWithdrawAmount(value)
    setShowError(false)
    setErrorMessage("")
  }

  const handleMethodChange = (method: string) => {
    setPaymentMethod(method)
    setShowError(false)
    setErrorMessage("")
  }

  const handleWithdrawRequest = () => {
    if (pendingBalance > 0) {
      setShowError(true)
      setErrorMessage(
        "You have a pending withdrawal scheduled for January 12th, 2026. Please wait for it to be processed before requesting another withdrawal.",
      )
      return
    }

    if (kycStatus !== "verified") {
      openKycPromptModal()
      return
    }
    console.log("Withdrawal requested with amount:", withdrawAmount, "method:", paymentMethod)
    if (showError) {
      return
    }
    alert("Withdrawal request submitted (simulated)!")
  }

  const handleWithdrawalRowClick = (withdrawalId: string) => {
    if (!withdrawalId) {
      return
    }

    const withdrawal = withdrawalHistory.find((w) => w.id === withdrawalId)
    if (withdrawal) {
      setSelectedWithdrawal(withdrawal)
      setShowWithdrawalDetails(true)
    }
  }

  const handleDownloadPDF = (paymentEntry: any) => {
    const pdfContent = `
Payment Confirmation Receipt
ExoClick Professional Template

===========================================
TRANSACTION DETAILS
===========================================

Date: ${paymentEntry.date}
Method: ${paymentEntry.method}
Amount: ${paymentEntry.amount}
Status: ${paymentEntry.status}

===========================================
CONFIRMATION DETAILS
===========================================

Transaction ID: ${paymentEntry.transaction_id}
Bank Reference: ${paymentEntry.bank_reference}
Trace Number: ${paymentEntry.trace_number}
Confirmed On: ${paymentEntry.confirmed_date}

===========================================
BENEFICIARY INFORMATION
===========================================

Beneficiary: ${paymentEntry.beneficiary}
Bank: ${paymentEntry.bank}
Country: ${paymentEntry.country}

===========================================
CONFIRMATION NOTE
===========================================

${paymentEntry.note}

Proof: Funds have left sender's account and successfully deposited into recipient's bank.

===========================================
This is an official payment confirmation receipt.
Generated on: ${new Date().toLocaleDateString()}
===========================================
    `.trim()

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = paymentEntry.file_name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleOpenAddMethod = () => {
    setFormData({
      type: "",
      accountHolderName: "",
      email: "",
      country: "",
      currency: "USD",
      confirmChecked: false,
    })
    setAddMethodStep(1)
    setShowAddMethodModal(true)
  }

  const handleAddMethodNext = () => {
    if (addMethodStep === 1 && !formData.type) return
    if (addMethodStep === 2 && (!formData.accountHolderName || !formData.email || !formData.country)) return
    if (addMethodStep < 3) {
      setAddMethodStep(addMethodStep + 1)
    }
  }

  const handleAddMethodBack = () => {
    if (addMethodStep > 1) {
      setAddMethodStep(addMethodStep - 1)
    }
  }

  const handleAddMethodSubmit = () => {
    if (!formData.confirmChecked) return

    const newMethod: PaymentMethodData = {
      id: `pm-${Date.now()}`,
      type: formData.type as "payoneer" | "bank" | "crypto",
      accountHolderName: formData.accountHolderName,
      email: formData.email,
      country: formData.country,
      currency: formData.currency,
      status: "Pending Approval",
      isDefault: paymentMethods.length === 0,
      priority: paymentMethods.length + 1,
      addedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }

    setPaymentMethods([...paymentMethods, newMethod])
    setShowAddMethodModal(false)
    setAddMethodStep(1)
  }

  const handleOpenEditMethod = (method: PaymentMethodData) => {
    if (method.status === "Inactive") return
    setSelectedMethod(method)
    setFormData({
      type: method.type,
      accountHolderName: method.accountHolderName,
      email: method.email,
      country: method.country,
      currency: method.currency,
      confirmChecked: false,
    })
    setShowEditMethodModal(true)
  }

  const handleEditMethodSubmit = () => {
    if (!selectedMethod) return

    setPaymentMethods(
      paymentMethods.map((m) =>
        m.id === selectedMethod.id
          ? {
              ...m,
              accountHolderName: formData.accountHolderName,
              email: formData.email,
              country: formData.country,
              currency: formData.currency,
            }
          : m,
      ),
    )
    setShowEditMethodModal(false)
    setSelectedMethod(null)
  }

  const handleOpenDeleteConfirm = (method: PaymentMethodData) => {
    setSelectedMethod(method)
    setShowDeleteConfirm(true)
  }

  const handleDeleteMethod = () => {
    if (!selectedMethod) return

    const updatedMethods = paymentMethods
      .filter((m) => m.id !== selectedMethod.id)
      .map((m, index) => ({ ...m, priority: index + 1 }))

    if (selectedMethod.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true
    }

    setPaymentMethods(updatedMethods)
    setShowDeleteConfirm(false)
    setSelectedMethod(null)
  }

  const handleOpenViewMethod = (method: PaymentMethodData) => {
    setSelectedMethod(method)
    setShowViewMethodPage(true)
  }

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods(
      paymentMethods.map((m) => ({
        ...m,
        isDefault: m.id === methodId,
      })),
    )
  }

  const getMethodTypeLabel = (type: string) => {
    switch (type) {
      case "payoneer":
        return "Payoneer"
      case "bank":
        return "Bank Transfer"
      case "crypto":
        return "Crypto"
      default:
        return type
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payments</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="withdraw" className="space-y-6">
            <TabsList>
              <TabsTrigger value="withdraw">Withdraw Funds</TabsTrigger>
              <TabsTrigger value="history">Withdrawal History</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="withdraw" className="space-y-6">
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-green-800">Available Balance</h3>
                    <p className="text-2xl font-bold text-green-600">${availableBalance.toFixed(2)}</p>
                  </div>
                  <Wallet className="text-green-600" size={32} />
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Withdraw Funds</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Payment Method</label>
                    <RadioGroup value={paymentMethod} onValueChange={handleMethodChange} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="payoneer" id="payoneer" />
                        <Label htmlFor="payoneer" className="flex items-center space-x-2 cursor-pointer">
                          <Wallet size={16} />
                          <span>Payoneer</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex items-center space-x-2 cursor-pointer">
                          <Wallet size={16} />
                          <span>Crypto (USDT/BTC/ETH)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                        <Label htmlFor="bank-transfer" className="flex items-center space-x-2 cursor-pointer">
                          <Building2 size={16} />
                          <span>Bank Transfer</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cepto" id="cepto" />
                        <Label htmlFor="cepto" className="flex items-center space-x-2 cursor-pointer">
                          <CreditCard size={16} />
                          <span>CEPTO</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="text-xs text-gray-500 mt-2">Only verified methods can be used for withdrawals</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount to withdraw"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="bg-white"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Available: ${availableBalance.toFixed(2)} | No Limit
                    </div>
                  </div>

                  {paymentMethod === "payoneer" && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Payoneer Email</label>
                      <Input
                        type="email"
                        placeholder="Enter your Payoneer email address"
                        value={payoneerEmail}
                        onChange={(e) => setPayoneerEmail(e.target.value)}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Enter the email associated with your Payoneer account
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div>
                      <label className="block text-sm font-medium mb-2">PayPal Email</label>
                      <Input
                        type="email"
                        placeholder="Enter your PayPal email address"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Enter the email associated with your PayPal account
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={handleWithdrawRequest}
                    disabled={
                      !withdrawAmount ||
                      Number(withdrawAmount) <= 0 ||
                      (paymentMethod === "paypal" && !paypalEmail) ||
                      (paymentMethod === "payoneer" && !payoneerEmail)
                    }
                  >
                    {paymentMethod === "payoneer" ? (
                      <Wallet className="mr-2" size={16} />
                    ) : paymentMethod === "bank-transfer" ? (
                      <Building2 className="mr-2" size={16} />
                    ) : paymentMethod === "cepto" ? (
                      <CreditCard className="mr-2" size={16} />
                    ) : (
                      <Mail className="mr-2" size={16} />
                    )}
                    Request Withdrawal
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Payment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Available Balance</div>
                    <div className="text-2xl font-bold text-green-600">${availableBalance.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Payments</div>
                    <div className="text-2xl font-bold text-gray-800">${totalPayments.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Next Withdrawal</div>
                    <div className="text-lg font-semibold text-gray-800">{nextWithdrawalDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Pending</div>
                    <div className="text-2xl font-bold text-yellow-600">${pendingBalance.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">{nextWithdrawalDate}</div>
                  </div>
                </div>
              </Card>

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
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawalHistory.length > 0 ? (
                        withdrawalHistory.map((withdrawal) => (
                          <tr
                            key={withdrawal.id}
                            className="border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleWithdrawalRowClick(withdrawal.id)}
                          >
                            <td className="py-3 px-4 text-sm">{withdrawal.date}</td>
                            <td className="py-3 px-4 text-sm">{withdrawal.method}</td>
                            <td className="py-3 px-4 text-sm font-medium">{withdrawal.amount}</td>
                            <td className="py-3 px-4 text-sm">
                              <Badge
                                className={
                                  withdrawal.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : withdrawal.status === "Pending"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {withdrawal.status}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-12 text-center">
                            <div className="text-gray-400">
                              <Wallet className="h-12 w-12 mx-auto mb-2" />
                              <p className="text-sm font-medium">No withdrawal history</p>
                              <p className="text-xs mt-1">Your withdrawals will appear here</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="methods" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Payment Methods</h2>
                  <Button onClick={handleOpenAddMethod} size="sm" className="bg-green-500 hover:bg-green-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>

                {/* Payment Methods List */}
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <Card key={method.id} className={`p-4 ${method.isDefault ? "border-green-200 bg-green-50" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <GripVertical className="h-4 w-4" />
                            <span className="text-xs font-medium">#{method.priority}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {method.type === "payoneer" && <Wallet className="h-5 w-5 text-green-600" />}
                            {method.type === "bank" && <Building2 className="h-5 w-5 text-blue-600" />}
                            {method.type === "crypto" && <CreditCard className="h-5 w-5 text-orange-600" />}
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-800">{getMethodTypeLabel(method.type)}</span>
                                {method.isDefault && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                                    <Star className="h-3 w-3 mr-1" />
                                    Default
                                  </Badge>
                                )}
                                <Badge className={`text-xs ${getStatusBadgeColor(method.status)}`}>
                                  {method.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{method.accountHolderName}</p>
                              <p className="text-xs text-gray-500">{method.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-xs text-gray-500 mr-4">Added: {method.addedDate}</div>
                          {!method.isDefault && method.status === "Active" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)}>
                                    <Star className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Set as Default</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleOpenViewMethod(method)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View Details</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleOpenEditMethod(method)}
                                  disabled={method.status === "Inactive"}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Method</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => handleOpenDeleteConfirm(method)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete Method</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {paymentMethods.length === 0 && (
                    <Card className="p-8 border-dashed flex flex-col items-center justify-center">
                      <Wallet className="h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-sm text-gray-500 mb-3">No payment methods added yet</p>
                      <Button onClick={handleOpenAddMethod} variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Payment Method
                      </Button>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showAddMethodModal} onOpenChange={setShowAddMethodModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Add Payment Method</span>
              <Button variant="ghost" size="sm" onClick={() => setShowAddMethodModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    addMethodStep >= step ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {addMethodStep > step ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < 3 && <div className={`w-12 h-1 ${addMethodStep > step ? "bg-green-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Select Method */}
          {addMethodStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium text-center">Select Payment Method Type</h3>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as any })}
              >
                <div className="space-y-3">
                  <div
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${formData.type === "payoneer" ? "border-green-500 bg-green-50" : ""}`}
                  >
                    <RadioGroupItem value="payoneer" id="add-payoneer" />
                    <Label htmlFor="add-payoneer" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5 text-green-600" />
                      <span>Payoneer</span>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${formData.type === "bank" ? "border-green-500 bg-green-50" : ""}`}
                  >
                    <RadioGroupItem value="bank" id="add-bank" />
                    <Label htmlFor="add-bank" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <span>Bank Transfer</span>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${formData.type === "crypto" ? "border-green-500 bg-green-50" : ""}`}
                  >
                    <RadioGroupItem value="crypto" id="add-crypto" />
                    <Label htmlFor="add-crypto" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-orange-600" />
                      <span>Crypto (USDT/BTC/ETH)</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 2: Account Details */}
          {addMethodStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium text-center">Enter Account Details</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="accountHolderName">Account Holder Name</Label>
                  <Input
                    id="accountHolderName"
                    placeholder="Enter full name"
                    value={formData.accountHolderName}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email / Account ID</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email or account ID"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pakistan">Pakistan</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {addMethodStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium text-center">Review & Confirm</h3>
              <Card className="p-4 bg-gray-50">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Method Type:</span>
                    <span className="font-medium">{getMethodTypeLabel(formData.type)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Holder:</span>
                    <span className="font-medium">{formData.accountHolderName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email/Account:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Country:</span>
                    <span className="font-medium">{formData.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Currency:</span>
                    <span className="font-medium">{formData.currency}</span>
                  </div>
                </div>
              </Card>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  New payment methods require admin approval before they can be used for withdrawals.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confirm"
                  checked={formData.confirmChecked}
                  onCheckedChange={(checked) => setFormData({ ...formData, confirmChecked: checked as boolean })}
                />
                <Label htmlFor="confirm" className="text-sm">
                  I confirm that the above information is correct
                </Label>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {addMethodStep > 1 ? (
              <Button variant="outline" onClick={handleAddMethodBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
            {addMethodStep < 3 ? (
              <Button onClick={handleAddMethodNext} disabled={addMethodStep === 1 && !formData.type}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleAddMethodSubmit}
                disabled={!formData.confirmChecked}
                className="bg-green-500 hover:bg-green-600"
              >
                <Check className="mr-2 h-4 w-4" />
                Add Method
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditMethodModal} onOpenChange={setShowEditMethodModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Edit Payment Method</span>
              <Button variant="ghost" size="sm" onClick={() => setShowEditMethodModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-accountHolderName">Account Holder Name</Label>
              <Input
                id="edit-accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email / Account ID</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-country">Country</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditMethodModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditMethodSubmit} className="bg-green-500 hover:bg-green-600">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <Trash2 className="mr-2 h-5 w-5" />
              Delete Payment Method
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">Are you sure you want to delete this payment method?</p>
            {selectedMethod && (
              <Card className="mt-3 p-3 bg-gray-50">
                <p className="font-medium">{getMethodTypeLabel(selectedMethod.type)}</p>
                <p className="text-sm text-gray-500">{selectedMethod.accountHolderName}</p>
                <p className="text-xs text-gray-400">{selectedMethod.email}</p>
              </Card>
            )}
            <p className="text-xs text-red-500 mt-3">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMethod}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showViewMethodPage} onOpenChange={setShowViewMethodPage}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Payment Method Details</span>
              <Button variant="ghost" size="sm" onClick={() => setShowViewMethodPage(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedMethod && (
            <div className="space-y-4">
              <Card className="p-4 bg-gray-50">
                <div className="flex items-center space-x-3 mb-4">
                  {selectedMethod.type === "payoneer" && <Wallet className="h-8 w-8 text-green-600" />}
                  {selectedMethod.type === "bank" && <Building2 className="h-8 w-8 text-blue-600" />}
                  {selectedMethod.type === "crypto" && <CreditCard className="h-8 w-8 text-orange-600" />}
                  <div>
                    <h3 className="font-semibold text-lg">{getMethodTypeLabel(selectedMethod.type)}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getStatusBadgeColor(selectedMethod.status)}`}>
                        {selectedMethod.status}
                      </Badge>
                      {selectedMethod.isDefault && <Badge className="bg-blue-100 text-blue-800 text-xs">Default</Badge>}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Account Holder</p>
                    <p className="font-medium">{selectedMethod.accountHolderName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email / Account</p>
                    <p className="font-medium">{selectedMethod.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Country</p>
                    <p className="font-medium">{selectedMethod.country}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Currency</p>
                    <p className="font-medium">{selectedMethod.currency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Priority</p>
                    <p className="font-medium">#{selectedMethod.priority}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Added On</p>
                    <p className="font-medium">{selectedMethod.addedDate}</p>
                  </div>
                </div>
              </Card>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    const data = `Payment Method Details\n\nType: ${getMethodTypeLabel(selectedMethod.type)}\nAccount Holder: ${selectedMethod.accountHolderName}\nEmail: ${selectedMethod.email}\nCountry: ${selectedMethod.country}\nCurrency: ${selectedMethod.currency}\nStatus: ${selectedMethod.status}\nAdded: ${selectedMethod.addedDate}`
                    const blob = new Blob([data], { type: "text/plain" })
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement("a")
                    link.href = url
                    link.download = `payment-method-${selectedMethod.id}.txt`
                    link.click()
                    URL.revokeObjectURL(url)
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowViewMethodPage(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <WithdrawalDetailsModal
        isOpen={showWithdrawalDetails}
        onClose={() => setShowWithdrawalDetails(false)}
        withdrawal={selectedWithdrawal}
        allWithdrawals={[]}
      />

      <KycPromptModal />

      <Dialog open={showBankTransferConfirmation} onOpenChange={setShowBankTransferConfirmation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <FileText className="mr-2 h-6 w-6 text-blue-600" />
              {selectedPaymentEntry?.method?.includes("Crypto")
                ? "Ilm Info Tech Crypto Payment Receipt"
                : "Ilm Info Tech Payment Receipt"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {selectedPaymentEntry?.method?.includes("Crypto") ? (
              <>
                <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-red-800">Ilm Info Tech</h2>
                      <p className="text-sm text-red-600">Crypto Payment Receipt</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        <strong>Receipt ID:</strong> {selectedPaymentEntry?.receipt_id}
                      </p>
                      <p>
                        <strong>Date:</strong> {selectedPaymentEntry?.date}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Payment Method:</strong> {selectedPaymentEntry?.method}
                      </p>
                      <p>
                        <strong>Blockchain:</strong> {selectedPaymentEntry?.blockchain_network}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Status:</strong> <Badge className="bg-red-100 text-red-800">Failed</Badge>
                      </p>
                      <p>
                        <strong>Support:</strong> ilm.info.technology@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Transaction Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Transaction ID</span>
                      <span className="text-sm font-mono text-red-800">{selectedPaymentEntry?.transaction_id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Wallet Address</span>
                      <span className="text-sm font-mono text-red-800">{selectedPaymentEntry?.wallet_address}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Amount (USD)</span>
                      <span className="text-lg font-bold text-red-800">{selectedPaymentEntry?.amount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Equivalent USDT</span>
                      <span className="text-sm font-semibold text-red-800">
                        {selectedPaymentEntry?.equivalent_usdt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Failure Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Reason:</strong> {selectedPaymentEntry?.reason}
                    </p>
                    <p className="text-sm text-red-700">{selectedPaymentEntry?.processing_notes}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Support Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Email:</strong> ilm.info.technology@gmail.com
                      </p>
                      <p>
                        <strong>Phone:</strong> +92 325 6771645
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Issued By:</strong> Ilm Info Tech Payments Department
                      </p>
                      <p>
                        <strong>Verification:</strong> {selectedPaymentEntry?.verification}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-800">Ilm Info Tech</h2>
                      <p className="text-sm text-blue-600">Payment Receipt</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        <strong>Date Issued:</strong> 27 August, 2025
                      </p>
                      <p>
                        <strong>Email:</strong> ilm.info.technology@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Company:</strong> Ilm Info Tech
                      </p>
                      <p>
                        <strong>Beneficiary:</strong> Jahnzaib Nadir
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Bank:</strong> Bank of America (USA)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Transaction Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Payment Date</span>
                      <span className="text-sm font-semibold text-blue-800">25 August, 2025</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Payment Method</span>
                      <span className="text-sm font-semibold text-blue-800">Bank Transfer (USA)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Transaction ID</span>
                      <span className="text-sm font-mono text-blue-800">
                        {selectedPaymentEntry?.transaction_id || "TXN-25082025-EXC"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Trace Number</span>
                      <span className="text-sm font-mono text-blue-800">
                        {selectedPaymentEntry?.trace_number || "TRC-9823456712"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Bank Reference</span>
                      <span className="text-sm font-mono text-blue-800">
                        {selectedPaymentEntry?.bank_reference || "BofA-2025-89734"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Payment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Amount</span>
                      <span className="text-lg font-bold text-green-800">{selectedPaymentEntry?.amount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Currency</span>
                      <span className="text-sm font-semibold text-green-800">USD</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Status</span>
                      <span className="text-sm font-semibold text-green-800">Withdrawn — Confirmed</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Confirmation Date</span>
                      <span className="text-sm font-semibold text-green-800">
                        {selectedPaymentEntry?.confirmed_date || "27 August, 2025"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Verification</span>
                      <span className="text-sm font-semibold text-blue-800">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Bank Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Account Holder</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {selectedPaymentEntry?.beneficiary || "Jahnzaib Nadir"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Country</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {selectedPaymentEntry?.country || "USA"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Transfer Type</span>
                      <span className="text-sm font-semibold text-gray-800">ACH / Wire Transfer</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 block mb-2">Reference Note</span>
                    <p className="text-sm text-gray-600">Funds successfully transferred via Bank of America</p>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800 mb-2">
                    <strong>PDF Settings:</strong> Ilm Info Tech Professional Template | Preview Mode Enabled
                  </p>
                  <p className="text-xs text-yellow-700">Filename: Payment_Receipt_25082025.pdf</p>
                </div>

                <div className="flex space-x-2">
                  <Button disabled className="flex-1 bg-gray-300 hover:bg-gray-300 cursor-not-allowed">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF (Disabled)
                  </Button>
                  <Button onClick={() => setShowBankTransferConfirmation(false)} variant="outline" className="flex-1">
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  date?: string
}

function StatsCard({ title, value, date }: StatsCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-xs text-gray-500 mb-2">{title}</div>
            <div className="text-2xl font-semibold">{value}</div>
            {date && <div className="text-xs text-gray-500 mt-1">{date}</div>}
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title.toLowerCase()} details</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
