"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type KycStatus = "not_started" | "pending" | "verified" | "rejected"

interface KycContextType {
  kycStatus: KycStatus
  startKyc: () => void
  submitKyc: () => void
  isKycModalOpen: boolean
  openKycModal: () => void
  closeKycModal: () => void
  currentStep: number
  nextStep: () => void
  prevStep: () => void
  frontIdImage: string | null
  backIdImage: string | null
  faceVideo: string | null
  faceImage: string | null
  setFrontIdImage: (image: string | null) => void
  setBackIdImage: (image: string | null) => void
  setFaceVideo: (video: string | null) => void
  setFaceImage: (image: string | null) => void
  canSubmit: boolean
  selectedDocumentType: string | null
  setSelectedDocumentType: (type: string | null) => void
  isKycPromptModalOpen: boolean
  openKycPromptModal: () => void
  closeKycPromptModal: () => void
  verificationDate: string
  kycReference: string
  fullName: string
}

const KycContext = createContext<KycContextType | undefined>(undefined)

export function KycProvider({ children }: { children: ReactNode }) {
  const [kycStatus, setKycStatus] = useState<KycStatus>("verified")
  const [isKycModalOpen, setIsKycModalOpen] = useState(false)
  const [isKycPromptModalOpen, setIsKycPromptModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [frontIdImage, setFrontIdImage] = useState<string | null>(null)
  const [backIdImage, setBackIdImage] = useState<string | null>(null)
  const [faceVideo, setFaceVideo] = useState<string | null>(null)
  const [faceImage, setFaceImage] = useState<string | null>(null)
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>(null)

  const verificationDate = "2026-02-16"
  const kycReference = "KYC-AR-2026-0216"
  const fullName = "Yasir"

  const startKyc = () => {
    // If already verified, just show the completion modal
    if (kycStatus === "verified") {
      openKycModal()
      return
    }
    setKycStatus("not_started")
    setCurrentStep(1)
    setFrontIdImage(null)
    setBackIdImage(null)
    setFaceVideo(null)
    setFaceImage(null)
    setSelectedDocumentType(null)
    openKycModal()
  }

  const submitKyc = () => {
    setKycStatus("pending")
    closeKycModal()
  }

  const openKycModal = () => setIsKycModalOpen(true)
  const closeKycModal = () => setIsKycModalOpen(false)

  const openKycPromptModal = () => setIsKycPromptModalOpen(true)
  const closeKycPromptModal = () => setIsKycPromptModalOpen(false)

  const totalSteps = 3

  const nextStep = () => {
    if (currentStep <= totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canSubmit = !!selectedDocumentType && !!frontIdImage && !!backIdImage && !!faceVideo

  const value = {
    kycStatus,
    startKyc,
    submitKyc,
    isKycModalOpen,
    openKycModal,
    closeKycModal,
    currentStep,
    nextStep,
    prevStep,
    frontIdImage,
    backIdImage,
    faceVideo,
    faceImage,
    setFrontIdImage,
    setBackIdImage,
    setFaceVideo,
    setFaceImage,
    canSubmit,
    selectedDocumentType,
    setSelectedDocumentType,
    isKycPromptModalOpen,
    openKycPromptModal,
    closeKycPromptModal,
    verificationDate,
    kycReference,
    fullName,
  }

  return <KycContext.Provider value={value}>{children}</KycContext.Provider>
}

export function useKyc() {
  const context = useContext(KycContext)
  if (context === undefined) {
    throw new Error("useKyc must be used within a KycProvider")
  }
  return context
}
