"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  type: "success" | "info" | "warning" | "error"
  icon?: string
  persistent?: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "august-24-earnings",
      title: "📊 Daily Performance Update",
      message:
        "Daily earning of $675.00 has been added for August 24, 2025 with solid eCPM of $307.00! Consistent performance with 2,200 impressions and 3.14% CTR.",
      timestamp: new Date(Date.now() - 1 * 1000), // 1 second ago
      isRead: false,
      type: "success",
      icon: "📊",
    },
    {
      id: "august-23-earnings",
      title: "📈 Daily Performance Update",
      message:
        "Daily earning of $590.00 has been added for August 23, 2025 with good eCPM of $270.00! Steady results with 2,180 impressions and 3.12% CTR.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 1000 - 5 * 1000), // 1 day 5 seconds ago
      isRead: false,
      type: "success",
      icon: "📈",
    },
    {
      id: "august-22-earnings",
      title: "💎 Strong Performance Day",
      message:
        "Daily earning of $645.00 has been added for August 22, 2025 with excellent eCPM of $304.00! Great traffic quality with 2,120 impressions and 3.06% CTR.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 1000 - 10 * 1000), // 2 days 10 seconds ago
      isRead: false,
      type: "success",
      icon: "💎",
    },
    {
      id: "august-21-earnings",
      title: "🚀 Premium Traffic Performance",
      message:
        "Daily earning of $610.00 has been added for August 21, 2025 with solid eCPM of $306.00! Consistent performance with 1,990 impressions and 2.96% CTR.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 1000 - 15 * 1000), // 3 days 15 seconds ago
      isRead: false,
      type: "success",
      icon: "🚀",
    },
    {
      id: "august-20-earnings",
      title: "💰 Daily Performance Update",
      message:
        "Daily earning of $560.00 has been added for August 20, 2025 with good eCPM of $260.00! Steady results with 2,150 impressions and 3.07% CTR.",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 1000 - 20 * 1000), // 4 days 20 seconds ago
      isRead: false,
      type: "success",
      icon: "💰",
    },
    {
      id: "august-19-earnings",
      title: "🎯 Strong Performance Day",
      message:
        "Daily earning of $620.00 has been added for August 19, 2025 with excellent eCPM of $295.00! Great conversion rates with 2,100 impressions and 3.05% CTR.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 1000 - 25 * 1000), // 5 days 25 seconds ago
      isRead: false,
      type: "success",
      icon: "🎯",
    },
    {
      id: "august-18-earnings",
      title: "📈 Daily Performance Update",
      message:
        "Daily earning of $585.00 has been added for August 18, 2025 with solid eCPM of $285.00! Consistent results with 2,050 impressions and 2.97% CTR.",
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 1000 - 30 * 1000), // 6 days 30 seconds ago
      isRead: false,
      type: "success",
      icon: "📈",
    },
    {
      id: "august-17-earnings",
      title: "💎 Premium Performance Day",
      message:
        "Daily earning of $690.00 has been added for August 17, 2025 with excellent eCPM of $348.00! Outstanding traffic quality with 1,980 impressions and 2.88% CTR.",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 1000 - 35 * 1000), // 7 days 35 seconds ago
      isRead: false,
      type: "success",
      icon: "💎",
    },
    {
      id: "august-16-earnings",
      title: "📊 Daily Performance Update",
      message:
        "Daily earning of $570.00 has been added for August 16, 2025 with good eCPM of $271.00! Steady performance with 2,100 impressions and 2.95% CTR.",
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 1000 - 40 * 1000), // 8 days 40 seconds ago
      isRead: false,
      type: "success",
      icon: "📊",
    },
    {
      id: "august-15-earnings",
      title: "🚀 Strong Performance Day",
      message:
        "Daily earning of $650.00 has been added for August 15, 2025 with excellent eCPM of $342.00! Great traffic quality with 1,900 impressions and 3.10% CTR.",
      timestamp: new Date(Date.now() - 9 * 24 * 60 * 1000 - 45 * 1000), // 9 days 45 seconds ago
      isRead: false,
      type: "success",
      icon: "🚀",
    },
    {
      id: "august-14-earnings",
      title: "🏆 MASSIVE RECORD EARNINGS!",
      message:
        "Daily earning of $13,765.00 has been added for August 14, 2025 with INCREDIBLE eCPM of $3,204.00! This is your SECOND HIGHEST SINGLE DAY REVENUE EVER - absolutely extraordinary performance with 12,300 impressions!",
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 1000 - 50 * 1000), // 10 days 50 seconds ago
      isRead: false,
      type: "success",
      icon: "🏆",
    },
    {
      id: "august-13-earnings",
      title: "🏆 NEW ALL-TIME RECORD ACHIEVED!",
      message:
        "Daily earning of $24,564.00 has been added for August 13, 2025 with PHENOMENAL eCPM of $4,093.00! This is your NEW ALL-TIME HIGHEST SINGLE DAY REVENUE EVER - absolutely LEGENDARY performance with 21,000 impressions and 28.57% CTR!",
      timestamp: new Date(Date.now() - 11 * 24 * 60 * 1000 - 55 * 1000), // 11 days 55 seconds ago
      isRead: false,
      type: "success",
      icon: "🏆",
    },
    {
      id: "august-12-earnings",
      title: "📈 Consistent Performance",
      message:
        "Daily earning of $564.00 has been added for August 12, 2025 with solid eCPM of $322.00! Steady results with 1,750 impressions and 2.97% CTR.",
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 1000 - 10 * 1000), // 12 days 10 seconds ago
      isRead: false,
      type: "success",
      icon: "📈",
    },
    {
      id: "august-11-earnings",
      title: "🚀 Premium Traffic Performance",
      message:
        "Daily earning of $685.00 has been added for August 11, 2025 with excellent eCPM of $356.00! Great conversion rates with 1,920 impressions and 3.02% CTR.",
      timestamp: new Date(Date.now() - 13 * 24 * 60 * 1000 - 15 * 1000), // 13 days 15 seconds ago
      isRead: false,
      type: "success",
      icon: "🚀",
    },
    {
      id: "august-10-earnings",
      title: "💰 Daily Performance Update",
      message:
        "Daily earning of $643.00 has been added for August 10, 2025 with good eCPM of $348.00! Solid performance with 1,850 impressions and 2.86% CTR.",
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 1000 - 20 * 1000), // 14 days 20 seconds ago
      isRead: false,
      type: "success",
      icon: "💰",
    },
    {
      id: "august-9-earnings",
      title: "🏆 RECORD BREAKING PERFORMANCE!",
      message:
        "Daily earning of $24,432.00 has been added for August 9, 2025 with EXTRAORDINARY eCPM of $4,530.00! This was your PREVIOUS ALL-TIME RECORD - absolutely phenomenal performance with 19,820 impressions and 29.72% CTR!",
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 1000 - 25 * 1000), // 15 days 25 seconds ago
      isRead: false,
      type: "success",
      icon: "🏆",
    },
    {
      id: "august-8-earnings",
      title: "💥 MASSIVE REVENUE BREAKTHROUGH!",
      message:
        "Daily earning of $18,930.00 has been added for August 8, 2025 with INCREDIBLE eCPM of $4,008.00! This is your THIRD HIGHEST SINGLE DAY REVENUE EVER - absolutely extraordinary performance with 18,976 impressions!",
      timestamp: new Date(Date.now() - 16 * 24 * 60 * 1000 - 10 * 1000), // 16 days 10 seconds ago
      isRead: false,
      type: "success",
      icon: "💥",
    },
    {
      id: "august-7-earnings",
      title: "🚀 EXCEPTIONAL eCPM PERFORMANCE!",
      message:
        "Daily earning of $2,576.00 has been added for August 7, 2025 with OUTSTANDING eCPM of $3,549.00! Exceptional performance with premium traffic quality!",
      timestamp: new Date(Date.now() - 17 * 24 * 60 * 1000 - 10 * 1000), // 17 days 10 seconds ago
      isRead: false,
      type: "success",
      icon: "🚀",
    },
    {
      id: "august-6-earnings",
      title: "💎 Premium Traffic Performance",
      message:
        "Daily earning of $1,870.00 has been added for August 6, 2025 with excellent eCPM of $2,387.00! Outstanding traffic quality and conversion rates!",
      timestamp: new Date(Date.now() - 18 * 24 * 60 * 1000 - 20 * 1000), // 18 days 20 seconds ago
      isRead: false,
      type: "success",
      icon: "💎",
    },
    {
      id: "august-5-earnings",
      title: "🚀 Exceptional eCPM Performance",
      message:
        "Daily earning of $780.00 has been added for August 5, 2025 with outstanding eCPM of $1,456.00! New monthly record achieved!",
      timestamp: new Date(Date.now() - 19 * 24 * 60 * 1000 - 15 * 1000), // 19 days 15 seconds ago
      isRead: false,
      type: "success",
      icon: "🚀",
    },
    {
      id: "august-4-earnings",
      title: "💎 Premium Performance Alert",
      message:
        "Daily earning of $1,200.00 has been added for August 4, 2025 with excellent eCPM of $1,133.00! Outstanding results!",
      timestamp: new Date(Date.now() - 20 * 24 * 60 * 1000 - 30 * 1000), // 20 days 30 seconds ago
      isRead: false,
      type: "success",
      icon: "💎",
    },
    {
      id: "august-3-earnings",
      title: "⭐ High Performance Day",
      message:
        "Daily earning of $908.00 has been added for August 3, 2025 with strong eCPM of $987.00! Great momentum continues!",
      timestamp: new Date(Date.now() - 21 * 24 * 60 * 1000 - 45 * 1000), // 21 days 45 seconds ago
      isRead: true,
      type: "success",
      icon: "⭐",
    },
    {
      id: "august-2-earnings",
      title: "📈 Strong Performance",
      message:
        "Daily earning of $987.00 has been added for August 2, 2025 with solid eCPM of $876.00! Consistent growth!",
      timestamp: new Date(Date.now() - 22 * 24 * 60 * 1000 - 1 * 60 * 1000), // 22 days 1 minute ago
      isRead: true,
      type: "success",
      icon: "📈",
    },
    {
      id: "august-1-earnings",
      title: "🎯 August Launch Success",
      message:
        "Daily earning of $643.00 has been added for August 1, 2025 with good eCPM of $600.00! Strong start to the month!",
      timestamp: new Date(Date.now() - 23 * 24 * 60 * 1000 - 2 * 60 * 1000), // 23 days 2 minutes ago
      isRead: true,
      type: "success",
      icon: "🎯",
    },
    {
      id: "july-31-earnings",
      title: "📊 Month End Update",
      message:
        "Daily earning of $271.00 has been added for July 31, 2025 with eCPM of $390.00! July completed successfully!",
      timestamp: new Date(Date.now() - 24 * 24 * 60 * 1000 - 3 * 60 * 1000), // 24 days 3 minutes ago
      isRead: true,
      type: "success",
      icon: "📊",
    },
    {
      id: "july-30-earnings",
      title: "📊 Daily Earnings Update",
      message: "Daily earning of $241.00 has been added for July 30, 2025 with eCPM of $360.00!",
      timestamp: new Date(Date.now() - 25 * 24 * 60 * 1000 - 4 * 60 * 1000), // 25 days 4 minutes ago
      isRead: true,
      type: "success",
      icon: "📊",
    },
    {
      id: "july-29-earnings",
      title: "📊 Daily Earnings Update",
      message: "Daily earning of $198.00 has been added for July 29, 2025 with eCPM of $340.00!",
      timestamp: new Date(Date.now() - 26 * 24 * 60 * 1000 - 5 * 60 * 1000), // 26 days 5 minutes ago
      isRead: true,
      type: "success",
      icon: "📊",
    },
    {
      id: "july-24-refund-process",
      title: "⚠️ Pending Withdrawal",
      message:
        "Your July 24, 2025 Crypto (TRC20) withdrawal of $100,841.00 is pending — withdrawal completes within 48–72 hours. You will be notified once the withdrawal is confirmed.",
      timestamp: new Date(Date.now() - 31 * 24 * 60 * 1000 - 30 * 60 * 1000), // 31 days 30 minutes ago
      isRead: false,
      type: "warning",
      icon: "⚠️",
      persistent: true,
    },
    {
      id: "july-28-earnings",
      title: "📊 Daily Earnings Update",
      message:
        "Daily earning of $23.00 has been added for July 28, 2025 with solid eCPM of $760.00! Consistent performance maintained.",
      timestamp: new Date(Date.now() - 27 * 24 * 60 * 1000 - 30 * 1000), // 27 days 30 seconds ago
      isRead: true,
      type: "success",
      icon: "📊",
    },
    {
      id: "july-27-earnings",
      title: "📊 Daily Earnings Update",
      message:
        "Daily earning of $23.00 has been added for July 27, 2025 with exceptional eCPM of $980.00! Highest eCPM recorded this month!",
      timestamp: new Date(Date.now() - 28 * 24 * 60 * 1000 - 1 * 60 * 1000), // 28 days 1 minute ago
      isRead: true,
      type: "success",
      icon: "📊",
    },
    {
      id: "july-26-earnings",
      title: "🚀 Outstanding Performance",
      message:
        "Daily earning of $876.00 has been added for July 26, 2025 with excellent eCPM of $940.00! Great momentum continues!",
      timestamp: new Date(Date.now() - 29 * 24 * 60 * 1000 - 2 * 60 * 1000), // 29 days 2 minutes ago
      isRead: true,
      type: "success",
      icon: "🚀",
    },
    {
      id: "july-25-earnings",
      title: "🎯 Exceptional Performance Alert",
      message:
        "Daily earning of $983.00 has been added for July 25, 2025 with outstanding eCPM of $940.00! Your best performance yet!",
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 1000 - 2 * 60 * 1000), // 30 days 2 minutes ago
      isRead: true,
      type: "success",
      icon: "🎯",
    },
    {
      id: "july-24-earnings",
      title: "📈 Daily Earnings Update",
      message: "Daily earning of $350.00 has been added for July 24, 2025 with eCPM of $875.00!",
      timestamp: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000 - 5 * 60 * 1000), // 31 days 5 minutes ago
      isRead: true,
      type: "success",
      icon: "📈",
    },
    {
      id: "july-23-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $10.00 has been added for July 23, 2025.",
      timestamp: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000 - 5 * 60 * 1000), // 32 days 5 minutes ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-20-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $15.00 has been added for July 20, 2025.",
      timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000 - 10 * 60 * 1000), // 35 days 10 minutes ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-19-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $30.00 has been added for July 19, 2025.",
      timestamp: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000 - 15 * 60 * 1000), // 36 days 15 minutes ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-18-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $20.00 has been added for July 18, 2025.",
      timestamp: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000 - 20 * 60 * 1000), // 37 days 20 minutes ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "withdrawal-successful-july13",
      title: "🎉 Withdrawal Successful",
      message:
        "Congratulations! Your pending crypto withdrawal of $18,187.42 on July 12, 2025 has been successfully processed and confirmed.",
      timestamp: new Date("2025-07-13T14:45:00"), // July 13, 2025 at 2:45 PM
      isRead: false,
      type: "success",
      icon: "✅",
    },
    {
      id: "july-12-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $25.44 has been added for July 12, 2025.",
      timestamp: new Date(Date.now() - 39 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000), // 39 days 1 hour ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-11-earnings-updated",
      title: "Traffic Boost Alert",
      message: "July 11, 2025 earnings updated with premium traffic boost - eCPM increased to $903.00!",
      timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000 - 2 * 60 * 1000), // 40 days 2 minutes ago
      isRead: true,
      type: "success",
      icon: "🚀",
    },
    {
      id: "july-11-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $423.87 has been added for July 11, 2025.",
      timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000 - 15 * 60 * 1000), // 40 days 15 minutes ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-10-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $8,779.22 has been added for July 10, 2025.",
      timestamp: new Date(Date.now() - 41 * 24 * 60 * 60 * 1000 - 5 * 60 * 1000), // 41 days 5 minutes ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-9-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $2,416.11 has been added for July 9, 2025.",
      timestamp: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000 - 15 * 60 * 1000), // 42 days 15 minutes ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-8-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $930.00 has been added for July 8, 2025.",
      timestamp: new Date(Date.now() - 43 * 24 * 60 * 60 * 1000), // 43 days ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-7-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $690.98 has been added for July 7, 2025.",
      timestamp: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000), // 44 days ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-6-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $790.88 has been added for July 6, 2025.",
      timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-5-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $250.00 has been added for July 5, 2025.",
      timestamp: new Date(Date.now() - 46 * 24 * 60 * 60 * 1000), // 46 days ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "july-4-earnings",
      title: "Daily Earnings Added",
      message: "Daily earning of $240.00 has been added for July 4, 2025.",
      timestamp: new Date(Date.now() - 47 * 24 * 60 * 60 * 1000), // 47 days ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
    {
      id: "refund-processed",
      title: "Refund Processed",
      message:
        "Your PayPal withdrawal of $150 (originally requested on June 13, 2025) was refunded on June 30, 2025 due to non-acceptance by the recipient. The amount has been re-added to your available balance.",
      timestamp: new Date(2025, 5, 30, 14, 30), // June 30, 2025 at 2:30 PM
      isRead: true,
      type: "warning",
      icon: "🔄",
    },
    {
      id: "kyc-verified",
      title: "KYC Verification Completed",
      message: "Your KYC has been verified successfully on June 29, 2025. You can now withdraw funds without limits.",
      timestamp: new Date(Date.now() - 57 * 24 * 60 * 60 * 1000), // 57 days ago
      isRead: true,
      type: "success",
      icon: "🔔",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => {
        // Don't mark persistent notifications as read
        if (notification.persistent && notification.id === id) {
          return notification
        }
        return notification.id === id ? { ...notification, isRead: true } : notification
      }),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => {
        // Don't mark persistent notifications as read
        if (notification.persistent) {
          return notification
        }
        return { ...notification, isRead: true }
      }),
    )
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
