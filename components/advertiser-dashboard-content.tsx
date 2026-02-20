"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  TrendingUp,
  Eye,
  MousePointer,
  DollarSign,
  Calendar,
  MapPin,
  ImageIcon,
  Video,
  CheckCircle,
  Shield,
  CreditCard,
  Verified,
  Pause,
  Edit,
  AlertCircle,
} from "lucide-react"

export function AdvertiserDashboardContent() {
  const campaignData = {
    id: "",
    status: {
      label: "No Campaign",
      color: "gray",
      text: "No active campaigns",
    },
    duration: {
      text: "",
      daysCompleted: 0,
      daysRemaining: 0,
    },
    performance: {
      impressions: 0,
      clicks: 0,
      ctr: "0.00%",
      totalSpend: 0.0,
      remainingBudget: 0.0,
    },
    dailySpend: [],
    geoPerformance: [],
    adFormats: {
      imageAds: { status: "Inactive", impressions: 0, clicks: 0 },
      videoAds: { status: "Inactive", impressions: 0, clicks: 0 },
    },
    systemStatus: {
      aiOptimization: "Disabled",
      fraudProtection: "Inactive",
      paymentStatus: "Not Verified",
      reviewStatus: "Pending",
    },
  }

  const hasNoCampaigns = campaignData.dailySpend.length === 0

  const progressPercentage = 0

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {hasNoCampaigns && (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <AlertCircle size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">No advertiser data available</h3>
              <p className="text-sm text-gray-500 max-w-md">
                There are no active campaigns, ads, or advertiser statistics to display at this time.
              </p>
            </div>
          </Card>
        )}

        {/* Active Campaign Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Active Campaign</h2>
                <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100">
                  <AlertCircle size={14} className="mr-1" />
                  {campaignData.status.label}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Campaign ID: {campaignData.id || "N/A"}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" disabled>
                <Edit size={16} />
                Edit Campaign
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" disabled>
                <Pause size={16} />
                Pause Campaign
              </Button>
            </div>
          </div>

          {/* Campaign Duration & Progress */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Duration: {campaignData.duration.text || "N/A"}
                </span>
              </div>
              <span className="text-sm text-gray-600">{campaignData.duration.daysCompleted} of 0 days completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">{campaignData.duration.daysRemaining} days remaining</p>
          </div>

          {/* Performance Summary - All zeros */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={18} className="text-blue-500" />
                <span className="text-xs text-gray-500 uppercase">Impressions</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {campaignData.performance.impressions.toLocaleString()}
              </p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MousePointer size={18} className="text-green-500" />
                <span className="text-xs text-gray-500 uppercase">Clicks</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{campaignData.performance.clicks.toLocaleString()}</p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-purple-500" />
                <span className="text-xs text-gray-500 uppercase">CTR</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{campaignData.performance.ctr}</p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={18} className="text-red-500" />
                <span className="text-xs text-gray-500 uppercase">Total Spend</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">${campaignData.performance.totalSpend.toFixed(2)}</p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={18} className="text-amber-500" />
                <span className="text-xs text-gray-500 uppercase">Remaining Budget</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">${campaignData.performance.remainingBudget.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* Spend Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Spend Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Spend</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Impressions</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Clicks</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Note</th>
                </tr>
              </thead>
              <tbody>
                {campaignData.dailySpend.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                      No records available
                    </td>
                  </tr>
                ) : (
                  campaignData.dailySpend.map((day, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{day.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">${day.spend.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{day.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{day.clicks}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{day.note || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Geo Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-blue-500" />
              Geographic Performance
            </h3>
            <div className="space-y-4">
              {campaignData.geoPerformance.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-sm">No geographic data available</div>
              ) : (
                campaignData.geoPerformance.map((geo, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{geo.country}</p>
                      <p className="text-xs text-gray-500">{geo.impressions.toLocaleString()} impressions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{geo.clicks} clicks</p>
                      <p className="text-xs text-gray-500">{((geo.clicks / geo.impressions) * 100).toFixed(2)}% CTR</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Ad Formats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ad Format Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ImageIcon size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Image Ads</p>
                    <Badge variant="outline" className="text-xs bg-gray-100 text-gray-500 mt-1">
                      {campaignData.adFormats.imageAds.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {campaignData.adFormats.imageAds.impressions.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{campaignData.adFormats.imageAds.clicks} clicks</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Video Ads</p>
                    <Badge variant="outline" className="text-xs bg-gray-100 text-gray-500 mt-1">
                      {campaignData.adFormats.videoAds.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {campaignData.adFormats.videoAds.impressions.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{campaignData.adFormats.videoAds.clicks} clicks</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* System Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle size={20} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">AI Optimization</p>
                <p className="text-sm font-medium text-gray-900">{campaignData.systemStatus.aiOptimization}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Shield size={20} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Fraud Protection</p>
                <p className="text-sm font-medium text-gray-900">{campaignData.systemStatus.fraudProtection}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard size={20} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Payment Status</p>
                <p className="text-sm font-medium text-gray-900">{campaignData.systemStatus.paymentStatus}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Verified size={20} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Review Status</p>
                <p className="text-sm font-medium text-gray-900">{campaignData.systemStatus.reviewStatus}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
