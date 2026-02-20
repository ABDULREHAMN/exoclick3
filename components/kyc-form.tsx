"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, Camera, BadgeIcon as IdCard, StampIcon as Passport, Car } from "lucide-react"

export default function KycForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>(null)
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [frontIdImage, setFrontIdImage] = useState<string | null>(null)
  const [backIdImage, setBackIdImage] = useState<string | null>(null)
  const [faceImage, setFaceImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (image: string | null) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Unable to access camera. Please ensure camera permissions are granted.")
    }
  }, [])

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageDataUrl = canvas.toDataURL("image/png")
        setFaceImage(imageDataUrl)
        stopCamera()
      }
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }, [])

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const isStep1Complete = !!selectedDocumentType
  const isStep2Complete = !!fullName && !!address && !!phoneNumber
  const isStep3Complete = !!frontIdImage && !!backIdImage
  const isStep4Complete = !!faceImage

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">KYC Verification</h1>

        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Select Your Document Type</h2>
            <RadioGroup
              value={selectedDocumentType || ""}
              onValueChange={setSelectedDocumentType}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Label
                htmlFor="cnic"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
              >
                <RadioGroupItem value="cnic" id="cnic" className="sr-only" />
                <IdCard className="mb-3 h-8 w-8 text-blue-500" />
                <span className="block text-sm font-medium">CNIC</span>
              </Label>
              <Label
                htmlFor="passport"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
              >
                <RadioGroupItem value="passport" id="passport" className="sr-only" />
                <Passport className="mb-3 h-8 w-8 text-blue-500" />
                <span className="block text-sm font-medium">Passport</span>
              </Label>
              <Label
                htmlFor="driving-license"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-blue-500 cursor-pointer"
              >
                <RadioGroupItem value="driving-license" id="driving-license" className="sr-only" />
                <Car className="mb-3 h-8 w-8 text-blue-500" />
                <span className="block text-sm font-medium">Driving License</span>
              </Label>
            </RadioGroup>
            <Button onClick={handleNext} disabled={!isStep1Complete} className="w-full bg-blue-600 hover:bg-blue-700">
              Next
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Personal Info</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <Button onClick={handleNext} disabled={!isStep2Complete} className="w-full bg-blue-600 hover:bg-blue-700">
              Next
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Upload Documents</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="frontImage">Upload Front Image</Label>
                <input
                  type="file"
                  id="frontImage"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => handleFileChange(e, setFrontIdImage)}
                />
                {frontIdImage && (
                  <div className="mt-2 flex items-center space-x-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-gray-600">Image uploaded</span>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="backImage">Upload Back Image</Label>
                <input
                  type="file"
                  id="backImage"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) => handleFileChange(e, setBackIdImage)}
                />
                {backIdImage && (
                  <div className="mt-2 flex items-center space-x-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-gray-600">Image uploaded</span>
                  </div>
                )}
              </div>
            </div>
            <Button onClick={handleNext} disabled={!isStep3Complete} className="w-full bg-blue-600 hover:bg-blue-700">
              Next
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Face Verification</h2>
            <p className="text-gray-600">Use your camera to verify your face</p>
            <div className="w-full border rounded-md overflow-hidden bg-gray-200 flex items-center justify-center h-64 relative">
              {cameraActive ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
              ) : faceImage ? (
                <img src={faceImage || "/placeholder.svg"} alt="Face Scan" className="w-full h-full object-cover" />
              ) : (
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-full w-full"
                  onClick={startCamera}
                >
                  <Camera className="mb-2" size={24} />
                  <span>Start Camera</span>
                </Button>
              )}
              <canvas ref={canvasRef} className="hidden"></canvas>
              {cameraActive && (
                <Button
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black hover:bg-gray-100"
                  onClick={captureImage}
                >
                  <Camera className="mr-2" size={16} />
                  Capture
                </Button>
              )}
            </div>
            <Button onClick={handleNext} disabled={!isStep4Complete} className="w-full bg-blue-600 hover:bg-blue-700">
              Submit KYC
            </Button>
          </div>
        )}

        {currentStep === 5 && (
          <div className="text-center space-y-4">
            <CheckCircle className="text-green-500 mx-auto h-16 w-16" />
            <h2 className="text-2xl font-bold text-green-700">Your KYC is In Progress.</h2>
            <p className="text-lg text-gray-700">
              We will review it within 5–6 business days. You’ll get an email once approved.
            </p>
          </div>
        )}

        {/* Optional Direct KYC Page Link - always visible */}
        {currentStep < 5 && (
          <div className="text-center mt-4">
            <a
              href="https://example.com/kyc-form"
              target="_blank"
              className="inline-block text-sm text-blue-700 underline"
              rel="noreferrer"
            >
              Or click here to open full KYC form
            </a>
          </div>
        )}
      </Card>
    </div>
  )
}
