"use client"

import { lazy, Suspense } from "react"
import { X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useKyc } from "./kyc-context"

// Lazy load the step components
const Step1DocumentType = lazy(() => import("./kyc-steps/step1-document-type"))
const Step2IdUpload = lazy(() => import("./kyc-steps/step2-id-upload"))
const Step3FaceScan = lazy(() => import("./kyc-steps/step3-face-scan"))

export function KycModal() {
  const {
    isKycModalOpen,
    closeKycModal,
    currentStep,
    nextStep,
    prevStep,
    frontIdImage,
    backIdImage,
    faceImage,
    selectedDocumentType,
    submitKyc,
    kycStatus,
    verificationDate,
    kycReference,
    fullName,
  } = useKyc()

  // If KYC is verified, show completion message
  if (kycStatus === "verified" && isKycModalOpen) {
    return (
      <Dialog open={isKycModalOpen} onOpenChange={closeKycModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              KYC Verification Complete
            </DialogTitle>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={closeKycModal}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Identity Verified Successfully!</h3>
              <p className="text-gray-600 mb-4">
                Your identity has been verified and your account is now fully activated.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Full Name:</span>
                <span className="text-sm text-gray-900">{fullName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Document Type:</span>
                <span className="text-sm text-gray-900">Driving License</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Verification Date:</span>
                <span className="text-sm text-gray-900">{verificationDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Reference ID:</span>
                <span className="text-sm font-mono text-gray-900">{kycReference}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <Badge className="bg-green-500 text-white">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </Badge>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">You can now withdraw funds without restrictions.</div>
          </div>

          <DialogFooter className="flex justify-center">
            <Button onClick={closeKycModal} className="bg-green-500 hover:bg-green-600">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const totalSteps = 3

  const renderStepContent = () => {
    return (
      <Suspense fallback={<div className="py-12 text-center">Loading...</div>}>
        {currentStep === 1 && <Step1DocumentType />}
        {currentStep === 2 && <Step2IdUpload />}
        {currentStep === 3 && <Step3FaceScan />}
      </Suspense>
    )
  }

  const isNextDisabled = () => {
    if (currentStep === 1) return !selectedDocumentType
    if (currentStep === 2) return !frontIdImage || !backIdImage
    if (currentStep === 3) return !faceImage
    return false
  }

  return (
    <Dialog open={isKycModalOpen} onOpenChange={closeKycModal}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            KYC Verification - Step {currentStep} of {totalSteps}
          </DialogTitle>
          <DialogDescription>Complete identity verification to increase your withdrawal limits.</DialogDescription>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={closeKycModal}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="py-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          {renderStepContent()}
        </div>

        <DialogFooter className="flex space-x-2 sm:justify-between">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <div>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={currentStep === totalSteps ? submitKyc : nextStep}
              disabled={isNextDisabled()}
            >
              {currentStep === totalSteps ? "Submit Verification" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
