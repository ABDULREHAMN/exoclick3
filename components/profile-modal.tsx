"use client"

import { X, User, Mail, Calendar, Shield, CheckCircle, Hash, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useKyc } from "./kyc-context"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { kycStatus, verificationDate, kycReference, fullName } = useKyc()

  const profileData = {
    fullName: "Raja Usman",
    email: "abdulrehmanseoexprt@gmail.com",
    username: "rajausman002",
    company: "Tech Blogi",
    phone: "+923227607144",
    website: "https://techblogi.com",
    joinDate: "12 January 2026",
    accountType: "Publisher",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            My Profile
          </DialogTitle>
          <DialogDescription>View your account information and verification status.</DialogDescription>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{profileData.fullName || "No name set"}</h2>
              <p className="text-gray-600">@{profileData.username || "username"}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-green-500 text-white">
                  <CheckCircle size={12} className="mr-1" />
                  {profileData.accountType}
                </Badge>
                <Badge className="bg-green-500 text-white">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="mr-2 h-5 w-5 text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  Email
                </div>
                <span className="text-sm text-gray-900">{profileData.email || "--"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <User className="mr-2 h-4 w-4 text-gray-500" />
                  Company
                </div>
                <span className="text-sm text-gray-900">{profileData.company || "--"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  Join Date
                </div>
                <span className="text-sm text-gray-900">{profileData.joinDate || "--"}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  Website
                </div>
                {profileData.website ? (
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {profileData.website}
                  </a>
                ) : (
                  <span className="text-sm text-gray-900">--</span>
                )}
              </div>
            </div>
          </div>

          {/* KYC Verification Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-800">
              <Shield className="mr-2 h-5 w-5" />
              KYC Verification Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-green-100">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                  Status
                </div>
                <Badge className="bg-green-500 text-white">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-100">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <FileText className="mr-2 h-4 w-4 text-green-600" />
                  Document Type
                </div>
                <span className="text-sm text-gray-900 font-medium">Manual Review</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-green-100">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="mr-2 h-4 w-4 text-green-600" />
                  Verification Date
                </div>
                <span className="text-sm text-gray-900 font-medium">{verificationDate}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <Hash className="mr-2 h-4 w-4 text-green-600" />
                  Reference ID
                </div>
                <span className="text-sm font-mono text-gray-900 font-medium">{kycReference}</span>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">$0.003</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">10</div>
                <div className="text-sm text-gray-600">Total Impressions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">1</div>
                <div className="text-sm text-gray-600">Total Clicks</div>
              </div>
            </div>
          </div>

          {/* Recent Activity - Hidden when empty */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
