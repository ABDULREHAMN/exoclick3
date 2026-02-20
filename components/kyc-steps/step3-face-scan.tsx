"use client"
import { useRef, useCallback, useState } from "react"
import { Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useKyc } from "../kyc-context"

export default function Step3FaceScan() {
  const { faceImage, setFaceImage } = useKyc()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)

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
        // Set crossOrigin to anonymous to avoid CORS issues if drawing images from other domains
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = video.srcObject ? URL.createObjectURL(video.srcObject as MediaStream) : ""
        img.onload = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          const imageDataUrl = canvas.toDataURL("image/png")
          setFaceImage(imageDataUrl)
          stopCamera()
        }
      }
    }
  }, [setFaceImage])

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-2">Face Verification</h3>
        <p className="text-sm text-gray-500 mb-4">Use your camera to verify your face.</p>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full border rounded-md overflow-hidden bg-gray-200 flex items-center justify-center h-64 relative">
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
            ) : faceImage ? (
              <img
                src={faceImage || "/placeholder.svg?height=256&width=384&query=face scan placeholder"}
                alt="Face Scan"
                className="w-full h-full object-cover"
              />
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
          {faceImage && (
            <Button variant="outline" size="sm" className="w-full" onClick={() => setFaceImage(null)}>
              <X size={16} className="mr-2" />
              Retake Photo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
