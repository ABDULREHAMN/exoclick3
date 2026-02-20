"use client"

import { useRouter, usePathname } from "next/navigation"
import { Home, BarChart2, Globe, Wallet, Megaphone, FileText, CreditCard, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface MobileBottomNavProps {
  onMoreClick: () => void
}

type UserRole = "Publisher" | "Advertiser"

export function MobileBottomNav({ onMoreClick }: MobileBottomNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentRole, setCurrentRole] = useState<UserRole>("Publisher")

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole
    if (savedRole) {
      setCurrentRole(savedRole)
    }
  }, [])

  const publisherItems = [
    { label: "Dashboard", icon: Home, route: "/publisher/dashboard" },
    { label: "Statistics", icon: BarChart2, route: "/publisher/statistics" },
    { label: "Sites", icon: Globe, route: "/publisher/sites-zones" },
    { label: "Payments", icon: Wallet, route: "/publisher/payments" },
  ]

  const advertiserItems = [
    { label: "Dashboard", icon: Home, route: "/advertiser/dashboard" },
    { label: "Campaigns", icon: Megaphone, route: "/advertiser/campaigns" },
    { label: "Reports", icon: FileText, route: "/advertiser/reports" },
    { label: "Billing", icon: CreditCard, route: "/advertiser/billing" },
  ]

  const navItems = currentRole === "Publisher" ? publisherItems : advertiserItems

  const isActive = (route: string) => pathname === route

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.route}
            onClick={() => router.push(item.route)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full transition-colors",
              isActive(item.route) ? "text-green-500" : "text-gray-600 hover:text-gray-900",
            )}
            aria-label={item.label}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
        <button
          onClick={onMoreClick}
          className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="More"
        >
          <Menu size={20} />
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </div>
  )
}
