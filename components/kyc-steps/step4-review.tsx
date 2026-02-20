"use client"

import { Shield } from "lucide-react"
import { useKyc } from "../kyc-context"

export default function Step3Review() {
  const { frontIdImage, backIdImage, faceImage } = useKyc()

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">Review & Submit</h3>
        <p className="text-sm text-gray-500 mb-4">Please review your information before submitting.</p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium mb-1">CNIC Front</h4>
              <img
                src={frontIdImage || "/placeholder.svg?height=128&width=200"}
                alt="CNIC Front"
                className="w-full h-32 object-cover rounded-md border"
              />
            </div>
            <div>
              <h4 className="text-xs font-medium mb-1">CNIC Back</h4>
              <img
                src={backIdImage || "/placeholder.svg?height=128&width=200"}
                alt="CNIC Back"
                className="w-full h-32 object-cover rounded-md border"
              />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium mb-1">Face Verification</h4>
            <img
              src={faceImage || "/placeholder.svg?height=128&width=200"}
              alt="Face Scan"
              className="w-full h-32 object-cover rounded-md border"
            />
          </div>
        </div>
      </div>
      <div className="rounded-lg border p-4 bg-blue-50 border-blue-100">
        <div className="flex items-start">
          <Shield className="text-blue-500 mr-2 mt-0.5" size={16} />
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">Privacy Notice</h3>
            <p className="text-xs text-blue-700">
              Your personal information is securely stored and will only be used for identity verification purposes. We
              comply with all relevant data protection regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
