"use client"

import { useState } from "react"
import { Wallet, CheckCircle, Building2, CreditCard, Plus, Bitcoin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PaymentMethodType = "payoneer" | "crypto" | "bank" | "cepto"

interface PaymentMethod {
  id: string
  type: PaymentMethodType
  displayName: string
  details: string
  verified: boolean
  isDefault: boolean
  addedDate: string
  icon: string
  network?: string
  status: "active" | "pending" | "inactive"
}

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "payoneer",
      displayName: "Payoneer",
      details: "abdul.rehman.soashraf@gmail.com",
      verified: true,
      isDefault: true,
      addedDate: "Oct 1, 2025",
      icon: "payoneer",
      network: "Abdul Rehman",
      status: "active",
    },
  ])

  const [showAddMethodDialog, setShowAddMethodDialog] = useState(false)
  const [selectedMethodType, setSelectedMethodType] = useState<PaymentMethodType | null>(null)
  const [showMethodForm, setShowMethodForm] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [cryptoForm, setCryptoForm] = useState({
    coin: "USDT",
    network: "TRC20",
    walletAddress: "",
  })

  const [bankForm, setBankForm] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    swiftCode: "",
  })

  const [ceptoForm, setCeptoForm] = useState({
    accountEmail: "",
    accountId: "",
  })

  const handleSelectMethodType = (type: PaymentMethodType) => {
    setSelectedMethodType(type)
    setShowAddMethodDialog(false)
    setShowMethodForm(true)
  }

  const handleSubmitMethod = () => {
    if (!selectedMethodType) return

    let newMethod: PaymentMethod | null = null

    switch (selectedMethodType) {
      case "crypto":
        if (cryptoForm.walletAddress) {
          newMethod = {
            id: `pm_${Date.now()}`,
            type: "crypto",
            displayName: `Crypto (${cryptoForm.coin})`,
            details: cryptoForm.walletAddress,
            verified: false,
            isDefault: false,
            addedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            icon: "crypto",
            network: `${cryptoForm.network} Network`,
            status: "pending",
          }
        }
        break
      case "bank":
        if (bankForm.accountHolder && bankForm.bankName && bankForm.accountNumber) {
          newMethod = {
            id: `pm_${Date.now()}`,
            type: "bank",
            displayName: "Bank Transfer",
            details: `${bankForm.accountHolder} - ${bankForm.accountNumber}`,
            verified: false,
            isDefault: false,
            addedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            icon: "bank",
            network: bankForm.bankName,
            status: "pending",
          }
        }
        break
      case "cepto":
        if (ceptoForm.accountEmail) {
          newMethod = {
            id: `pm_${Date.now()}`,
            type: "cepto",
            displayName: "CEPTO",
            details: ceptoForm.accountEmail,
            verified: false,
            isDefault: false,
            addedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            icon: "cepto",
            status: "pending",
          }
        }
        break
    }

    if (newMethod) {
      setPaymentMethods([...paymentMethods, newMethod])
      setShowMethodForm(false)
      setSelectedMethodType(null)
      setSuccessMessage("Payment method submitted for verification. Approval time: 24-48 hours")
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)

      // Reset forms
      setCryptoForm({ coin: "USDT", network: "TRC20", walletAddress: "" })
      setBankForm({ accountHolder: "", bankName: "", accountNumber: "", swiftCode: "" })
      setCeptoForm({ accountEmail: "", accountId: "" })
    }
  }

  const canAddMoreMethods = paymentMethods.length < 4

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Payment Methods</h2>

      {showSuccessMessage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <CheckCircle className="text-blue-500 mr-2 mt-0.5" size={20} />
            <div>
              <p className="text-blue-800 font-medium">{successMessage}</p>
              <p className="text-xs text-blue-600 mt-1">You will receive an email notification once approved.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <PaymentMethodCard key={method.id} method={method} />
        ))}

        {canAddMoreMethods && (
          <Card className="p-4 border-dashed flex items-center justify-center h-40">
            <Button
              variant="outline"
              className="flex items-center bg-transparent"
              onClick={() => setShowAddMethodDialog(true)}
            >
              <Plus className="mr-2" size={16} />
              Add Payment Method
            </Button>
          </Card>
        )}
      </div>

      <Dialog open={showAddMethodDialog} onOpenChange={setShowAddMethodDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Select a payment method to add</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 py-4">
            {!paymentMethods.some((m) => m.type === "crypto") && (
              <Button
                variant="outline"
                className="justify-start h-auto p-4 bg-transparent"
                onClick={() => handleSelectMethodType("crypto")}
              >
                <Bitcoin className="mr-3" size={20} />
                <div className="text-left">
                  <div className="font-medium">Crypto</div>
                  <div className="text-xs text-gray-500">USDT, BTC, ETH (TRC20)</div>
                </div>
              </Button>
            )}
            {!paymentMethods.some((m) => m.type === "bank") && (
              <Button
                variant="outline"
                className="justify-start h-auto p-4 bg-transparent"
                onClick={() => handleSelectMethodType("bank")}
              >
                <Building2 className="mr-3" size={20} />
                <div className="text-left">
                  <div className="font-medium">Bank Transfer</div>
                  <div className="text-xs text-gray-500">International bank account</div>
                </div>
              </Button>
            )}
            {!paymentMethods.some((m) => m.type === "cepto") && (
              <Button
                variant="outline"
                className="justify-start h-auto p-4 bg-transparent"
                onClick={() => handleSelectMethodType("cepto")}
              >
                <CreditCard className="mr-3" size={20} />
                <div className="text-left">
                  <div className="font-medium">CEPTO</div>
                  <div className="text-xs text-gray-500">Digital payment platform</div>
                </div>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showMethodForm && selectedMethodType === "crypto"}
        onOpenChange={(open) => !open && setShowMethodForm(false)}
      >
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add Crypto Payment Method</DialogTitle>
            <DialogDescription>Enter your cryptocurrency wallet details</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <div>
              <Label htmlFor="coin">Cryptocurrency</Label>
              <Select value={cryptoForm.coin} onValueChange={(value) => setCryptoForm({ ...cryptoForm, coin: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="network">Network</Label>
              <Select
                value={cryptoForm.network}
                onValueChange={(value) => setCryptoForm({ ...cryptoForm, network: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TRC20">TRC20</SelectItem>
                  <SelectItem value="ERC20">ERC20</SelectItem>
                  <SelectItem value="BEP20">BEP20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Input
                id="walletAddress"
                value={cryptoForm.walletAddress}
                onChange={(e) => setCryptoForm({ ...cryptoForm, walletAddress: e.target.value })}
                placeholder="Enter wallet address"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowMethodForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitMethod} disabled={!cryptoForm.walletAddress}>
              Submit for Verification
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showMethodForm && selectedMethodType === "bank"}
        onOpenChange={(open) => !open && setShowMethodForm(false)}
      >
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add Bank Transfer</DialogTitle>
            <DialogDescription>Enter your bank account details</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <div>
              <Label htmlFor="accountHolder">Account Holder Name</Label>
              <Input
                id="accountHolder"
                value={bankForm.accountHolder}
                onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                placeholder="Enter account holder name"
                required
              />
            </div>
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={bankForm.bankName}
                onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                placeholder="Enter bank name"
                required
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">IBAN / Account Number</Label>
              <Input
                id="accountNumber"
                value={bankForm.accountNumber}
                onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                placeholder="Enter account number"
                required
              />
            </div>
            <div>
              <Label htmlFor="swiftCode">SWIFT Code</Label>
              <Input
                id="swiftCode"
                value={bankForm.swiftCode}
                onChange={(e) => setBankForm({ ...bankForm, swiftCode: e.target.value })}
                placeholder="Enter SWIFT code"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowMethodForm(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitMethod}
              disabled={!bankForm.accountHolder || !bankForm.bankName || !bankForm.accountNumber || !bankForm.swiftCode}
            >
              Submit for Verification
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showMethodForm && selectedMethodType === "cepto"}
        onOpenChange={(open) => !open && setShowMethodForm(false)}
      >
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Add CEPTO Account</DialogTitle>
            <DialogDescription>Enter your CEPTO account details</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <div>
              <Label htmlFor="ceptoEmail">CEPTO Email</Label>
              <Input
                id="ceptoEmail"
                type="email"
                value={ceptoForm.accountEmail}
                onChange={(e) => setCeptoForm({ ...ceptoForm, accountEmail: e.target.value })}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="ceptoId">CEPTO Account ID (Optional)</Label>
              <Input
                id="ceptoId"
                value={ceptoForm.accountId}
                onChange={(e) => setCeptoForm({ ...ceptoForm, accountId: e.target.value })}
                placeholder="Enter account ID if available"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowMethodForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitMethod} disabled={!ceptoForm.accountEmail}>
              Submit for Verification
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface PaymentMethodCardProps {
  method: PaymentMethod
}

function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  const getIcon = () => {
    switch (method.type) {
      case "payoneer":
        return <Wallet className="h-5 w-5 text-green-600" />
      case "crypto":
        return <Bitcoin className="h-5 w-5 text-orange-600" />
      case "bank":
        return <Building2 className="h-5 w-5 text-blue-600" />
      case "cepto":
        return <CreditCard className="h-5 w-5 text-purple-600" />
      default:
        return <Wallet className="h-5 w-5" />
    }
  }

  const getStatusBadge = () => {
    if (method.verified || method.type === "payoneer") {
      return <Badge className="bg-green-100 text-green-800">Verified</Badge>
    }
    if (method.status === "pending" && method.type !== "payoneer") {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending Verification</Badge>
    }
    return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
  }

  return (
    <Card className={`p-4 ${method.isDefault ? "border-green-200 bg-green-50" : ""}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <span className="font-semibold text-gray-800">{method.displayName}</span>
          </div>
          {getStatusBadge()}
        </div>
        <div className="text-sm text-gray-600">
          {method.network && <p className="font-medium">{method.network}</p>}
          <p className="text-xs mt-1 truncate">{method.details}</p>
        </div>
        <div className="text-xs text-gray-500">Added on: {method.addedDate}</div>
        {method.isDefault && <Badge className="bg-blue-100 text-blue-800 text-xs">Default</Badge>}
      </div>
    </Card>
  )
}
