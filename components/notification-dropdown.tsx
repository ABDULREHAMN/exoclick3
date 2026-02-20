"use client"

import { useState } from "react"
import { Bell, Check, CheckCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotifications } from "./notification-context"

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return timestamp.toLocaleDateString()
  }

  const getNotificationColor = (type: string, isRead: boolean) => {
    const baseClasses = isRead ? "opacity-60" : ""
    switch (type) {
      case "success":
        return `bg-green-50 border-green-200 ${baseClasses}`
      case "warning":
        return `bg-yellow-50 border-yellow-200 ${baseClasses}`
      case "error":
        return `bg-red-50 border-red-200 ${baseClasses}`
      default:
        return `bg-blue-50 border-blue-200 ${baseClasses}`
    }
  }

  const handleNotificationClick = (id: string, persistent?: boolean) => {
    if (!persistent) {
      markAsRead(id)
    }

    // Handle withdrawal success notification click
    if (id === "withdrawal-successful-july13") {
      // Show withdrawal details popup
      alert(
        `🎉 Withdrawal Confirmed!\n\nTransaction ID: #TX-CR18187-JULY12\nStatus: Confirmed\nWallet: 0xb9cE52416d589bCe1AdCd02021BAe4D14202706B\nConfirmation Time: July 13, 2025 at 2:45 PM\n\n✅ Your withdrawal has been successfully processed!`,
      )
    }
  }

  const handleDropdownOpen = (open: boolean) => {
    setIsOpen(open)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-white border border-gray-200 shadow-lg rounded-md max-h-96 overflow-y-auto"
        sideOffset={5}
      >
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 p-1 h-auto"
              >
                <CheckCheck size={14} className="mr-1" />
                Mark all read
              </Button>
            )}
          </div>
          {unreadCount > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
            </p>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Bell className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <DropdownMenuItem
                  className="px-4 py-3 cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                  onClick={() => handleNotificationClick(notification.id, notification.persistent)}
                >
                  <div
                    className={`w-full p-3 rounded-lg border ${getNotificationColor(notification.type, notification.isRead)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {notification.icon ? (
                          <span className="text-lg">{notification.icon}</span>
                        ) : (
                          <Bell className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p
                            className={`text-sm font-medium ${notification.isRead ? "text-gray-600" : "text-gray-900"}`}
                          >
                            {notification.title}
                          </p>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p
                          className={`text-xs ${notification.isRead ? "text-gray-500" : "text-gray-700"} mb-2 leading-relaxed`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimeAgo(notification.timestamp)}
                          {notification.isRead && !notification.persistent && (
                            <span className="ml-2 flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Read
                            </span>
                          )}
                          {notification.persistent && (
                            <span className="ml-2 text-orange-600 font-medium">Persistent</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
                {index < notifications.length - 1 && <DropdownMenuSeparator className="my-1" />}
              </div>
            ))}
          </div>
        )}

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-4 py-2">
              <Button variant="ghost" className="w-full text-xs text-gray-600 hover:text-gray-800 justify-center">
                View all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
