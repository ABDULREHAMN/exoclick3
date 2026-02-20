"use client"

import { useState, useEffect } from "react"
import { LayoutDashboard, BarChart2, Globe, CreditCard, Users, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen?: boolean
}

export function Sidebar({ isOpen = true }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar_open_state")
      if (saved !== null) {
        setIsCollapsed(saved === "collapsed")
      }
    }
  }, [])

  const handleToggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar_open_state", newState ? "collapsed" : "open")
  }

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", route: "/publisher/dashboard" },
    { id: "statistics", icon: BarChart2, label: "Statistics", route: "/publisher/statistics" },
    { id: "sites-zones", icon: Globe, label: "Sites & Zones", route: "/publisher/sites-zones" },
    { id: "payments", icon: CreditCard, label: "Payments", route: "/publisher/payments" },
    { id: "referral-program", icon: Users, label: "Referral Program", route: "/publisher/referral-program" },
    { id: "neverblock", icon: Shield, label: "NeverBlock", route: "/publisher/neverblock" },
  ]

  const isActive = (route: string) => {
    return pathname === route
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" aria-hidden="true" />}

      <div
        style={{ zIndex: 1000 }}
        className={cn(
          "bg-[#1e2a38] text-white flex flex-col transition-all",
          "hidden lg:flex lg:relative",
          isCollapsed ? "lg:w-16" : "lg:w-48",
          "md:flex md:relative",
          isOpen ? "md:w-48" : "md:w-0 md:overflow-hidden",
          isCollapsed ? "md:w-16" : "",
          "fixed left-0 top-0 h-full lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 md:translate-x-0",
          isCollapsed && isOpen ? "w-16" : "w-48",
          "duration-[220ms] ease-in-out",
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <span className={cn("text-xl font-bold transition-opacity", isCollapsed && "lg:opacity-0 lg:w-0")}></span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleToggleCollapse()
            }}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded hover:bg-[#2a3a4d] transition-colors cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            type="button"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        <div className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.route}
              className={cn(
                "flex items-center w-full px-4 py-3 text-sm hover:bg-[#2a3a4d] transition-colors",
                isActive(item.route) && "bg-green-500",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded flex items-center justify-center",
                  isCollapsed ? "" : "mr-3",
                  isActive(item.route) ? "bg-white text-green-500" : "bg-[#2a3a4d]",
                )}
              >
                <item.icon size={18} />
              </div>
              <span className={cn("transition-opacity", isCollapsed && "lg:opacity-0 lg:w-0 lg:hidden")}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
