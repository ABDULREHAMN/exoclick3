"use client"

import { X, CheckCircle, FileText, Calendar, Hash, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

interface KycDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function KycDetailsModal({ isOpen, onClose }: KycDetailsModalProps) {
  const handleViewDocuments = () => {
    alert("Document viewer would open here (simulated)")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
              KYC Verification – Completed
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 rounded-lg border bg-green-50 border-green-200">
          <div className="space-y-4">
            {/* Status Badge */}
            <div className="flex items-center justify-center mb-4">
              <Badge className="bg-green-500 text-white flex items-center px-4 py-2">
                <CheckCircle size={16} className="mr-2" />✅ Verified
              </Badge>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-sm text-gray-600 flex items-center">
                  <FileText size={14} className="mr-1" />
                  Full Name
                </div>
                <div className="font-semibold">Motorist Michael, Matthew</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 flex items-center">
                  <FileText size={14} className="mr-1" />
                  Document Type
                </div>
                <div className="font-semibold">Driving License</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Verification Date
                </div>
                <div className="font-semibold">June 29, 2025</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 flex items-center">
                  <Hash size={14} className="mr-1" />
                  ID Reference
                </div>
                <div className="font-mono text-sm">#KYC2025-JUNE29</div>
              </div>
            </div>

            {/* Benefits */}
            <Card className="p-3 bg-white border-green-200">
              <div className="text-sm text-gray-600 mb-2">Verification Benefits</div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <CheckCircle size={12} className="mr-2 text-green-500" />
                  Unlimited withdrawal amounts
                </li>
                <li className="flex items-center">
                  <CheckCircle size={12} className="mr-2 text-green-500" />
                  Priority payment processing
                </li>
                <li className="flex items-center">
                  <CheckCircle size={12} className="mr-2 text-green-500" />
                  Enhanced account security
                </li>
                <li className="flex items-center">
                  <CheckCircle size={12} className="mr-2 text-green-500" />
                  Access to premium features
                </li>
              </ul>
            </Card>

            {/* Action Button */}
            <div className="flex justify-center pt-2">
              <Button variant="outline" className="flex items-center bg-transparent" onClick={handleViewDocuments}>
                <Eye size={14} className="mr-2" />
                View Verification Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
