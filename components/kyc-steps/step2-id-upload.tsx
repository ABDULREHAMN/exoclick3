"use client"

import type React from "react"

import { useRef } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useKyc } from "../kyc-context"

export default function Step1IdUpload() {
  const { frontIdImage, backIdImage, setFrontIdImage, setBackIdImage } = useKyc()
  const fileInputFrontRef = useRef<HTMLInputElement>(null)
  const fileInputBackRef = useRef<HTMLInputElement>(null)

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

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">Upload CNIC Front Side</h3>
        <p className="text-sm text-gray-500 mb-4">Please upload a clear image of the front side of your CNIC.</p>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            ref={fileInputFrontRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setFrontIdImage)}
          />
          {frontIdImage ? (
            <div className="relative w-full max-w-md">
              <img
                src={frontIdImage || "/placeholder.svg?height=200&width=300"}
                alt="CNIC Front"
                className="w-full rounded-md border"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white"
                onClick={() => setFrontIdImage(null)}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full h-32 border-dashed flex flex-col items-center justify-center"
              onClick={() => fileInputFrontRef.current?.click()}
            >
              <Upload className="mb-2" size={24} />
              <span>Click to upload</span>
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">Upload CNIC Back Side</h3>
        <p className="text-sm text-gray-500 mb-4">Please upload a clear image of the back side of your CNIC.</p>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            ref={fileInputBackRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setBackIdImage)}
          />
          {backIdImage ? (
            <div className="relative w-full max-w-md">
              <img
                src={backIdImage || "/placeholder.svg?height=200&width=300"}
                alt="CNIC Back"
                className="w-full rounded-md border"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white"
                onClick={() => setBackIdImage(null)}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full h-32 border-dashed flex flex-col items-center justify-center"
              onClick={() => fileInputBackRef.current?.click()}
            >
              <Upload className="mb-2" size={24} />
              <span>Click to upload</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
