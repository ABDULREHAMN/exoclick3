"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useKyc } from "./kyc-context"

export function KycPromptModal() {
  const { isKycPromptModalOpen, closeKycPromptModal, startKyc } = useKyc()

  const handleStartKyc = () => {
    closeKycPromptModal()
    startKyc()
  }

  return (
    <Dialog open={isKycPromptModalOpen} onOpenChange={closeKycPromptModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete KYC to Withdraw</DialogTitle>

          {/* short description text only */}
          <DialogDescription>You must verify your identity before requesting withdrawals.</DialogDescription>
        </DialogHeader>

        {/* rich content moved OUTSIDE DialogDescription to avoid p-in-p */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4 rounded">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
            <p className="text-sm text-red-800 font-medium">
              To proceed with withdrawals, you must first verify your identity.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleStartKyc}>
            Start KYC Verification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
