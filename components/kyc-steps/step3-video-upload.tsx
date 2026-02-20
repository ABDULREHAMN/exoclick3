"use client"

import type React from "react"

import { useRef } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useKyc } from "../kyc-context"

export default function Step3VideoUpload() {
  const { faceVideo, setFaceVideo } = useKyc()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFaceVideo(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">Face Verification (Video Upload)</h3>
        <p className="text-sm text-gray-500 mb-4">
          Please upload a short video of your face for verification (.mp4 or .webm).
        </p>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="video/mp4,video/webm"
            onChange={handleFileChange}
          />
          {faceVideo ? (
            <div className="relative w-full max-w-md">
              <video
                src={faceVideo}
                controls
                className="w-full rounded-md border"
                aria-label="Uploaded face verification video"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white"
                onClick={() => setFaceVideo(null)}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full h-32 border-dashed flex flex-col items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mb-2" size={24} />
              <span>Click to upload video</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
