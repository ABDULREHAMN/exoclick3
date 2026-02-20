"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, TrendingUp, Copy, CheckCircle } from "lucide-react"

export default function ReferralProgramPage() {
  const router = useRouter()
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/login")
    }
  }, [router])

  const referralLink = "https://neverblock.com/ref/rehseo007"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const referralStats = {
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
  }

  const recentActivity = []

  return (
    <div className="p-6 space-y-6 bg-[#f5f5f5] min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Referral Program</h1>
        <p className="text-gray-600">
          Earn passive income by referring publishers and advertisers to NeverBlock and EXOClick. You will receive a
          commission based on the activity and earnings of your referrals.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Referrals</div>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{referralStats.totalReferrals}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Active Referrals</div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">{referralStats.activeReferrals}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Earnings</div>
            <DollarSign className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600">${referralStats.totalEarnings.toFixed(2)}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Pending Earnings</div>
            <DollarSign className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">${referralStats.pendingEarnings.toFixed(2)}</div>
        </Card>
      </div>

      {/* Commission Model */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Commission Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Commission Rate</div>
            <div className="text-xl font-bold text-green-600">5%</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Applies To</div>
            <div className="text-sm font-medium text-gray-800">Net earnings of referred users</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Payout Cycle</div>
            <div className="text-sm font-medium text-gray-800">Monthly</div>
          </div>
        </div>
      </Card>

      {/* Referral Link */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Referral Link</h3>
        <div className="flex items-center space-x-2">
          <div className="flex-1 p-3 bg-gray-100 rounded border border-gray-300 font-mono text-sm">{referralLink}</div>
          <Button onClick={handleCopyLink} className="bg-blue-500 hover:bg-blue-600">
            {copiedLink ? (
              <>
                <CheckCircle size={16} className="mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} className="mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Referral Activity</h3>
        {recentActivity.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm font-medium">No referral activity yet</p>
              <p className="text-xs mt-1">Share your referral link to start earning</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.user}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-800 border-green-300">{activity.status}</Badge>
                  <div className="text-lg font-bold text-green-600">${activity.earnings.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Status Message */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Referral data updates automatically based on user activity.
        </p>
      </Card>
    </div>
  )
}
