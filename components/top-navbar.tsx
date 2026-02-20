"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ChevronDown, Globe, Search, User, Settings, LogOut, Bell, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TopNavbarProps {
  onNavigate?: (page: string) => void
}

type UserRole = "Publisher" | "Advertiser"

interface RoleOption {
  role: UserRole
  description: string
  route: string
  active: boolean
}

export function TopNavbar({ onNavigate }: TopNavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentRole, setCurrentRole] = useState<UserRole>("Publisher")

  const getBalanceDisplay = () => {
    if (currentRole === "Advertiser") {
      return { label: "Balance", value: "$0.00" }
    }
    return null
  }

  const balanceInfo = getBalanceDisplay()

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole
    if (savedRole) {
      setCurrentRole(savedRole)
    }
  }, [])

  const roleOptions: RoleOption[] = [
    {
      role: "Publisher",
      description: "Manage sites, zones, and earnings",
      route: "/dashboard",
      active: true,
    },
    {
      role: "Advertiser",
      description: "Create campaigns and manage ads",
      route: "/advertiser/dashboard",
      active: false,
    },
  ]

  const tabs = [
    { id: "dashboard", label: "Dashboard", route: "/publisher/dashboard" },
    { id: "statistics", label: "Statistics", route: "/publisher/statistics" },
    { id: "sites-zones", label: "Sites & Zones", route: "/publisher/sites-zones" },
    { id: "payments", label: "Payments", route: "/publisher/payments" },
    { id: "referral-program", label: "Referral Program", route: "/publisher/referral-program" },
    { id: "neverblock", label: "NeverBlock", route: "/publisher/neverblock" },
  ]

  const handleRoleSwitch = (role: UserRole, route: string) => {
    setCurrentRole(role)
    localStorage.setItem("userRole", role)
    router.push(route)
  }

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/login"
  }

  const handleViewProfile = () => {
    if (onNavigate) {
      onNavigate("profile-modal")
    }
  }

  const handleSettings = () => {
    if (onNavigate) {
      onNavigate("settings-modal")
    }
  }

  const handleMenuClick = () => {
    if (onNavigate) {
      onNavigate("toggle-sidebar")
    }
  }

  const isTabActive = (route: string) => {
    return pathname === route
  }

  const handleTabClick = (route: string) => {
    router.push(route)
  }

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center">
          <button
            onClick={handleMenuClick}
            className="lg:hidden p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors relative"
            style={{ zIndex: 1001 }}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center mr-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src="/exoclick-logo.jpg" alt="ExoClick Logo" className="h-10 w-auto object-contain" />
            </button>
          </div>

          <div className="relative mr-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center px-3 py-1.5 text-sm bg-gray-200 rounded text-gray-700 hover:bg-gray-300 transition-colors">
                  {currentRole}
                  <ChevronDown size={16} className="ml-2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-64 bg-white border border-gray-200 shadow-lg rounded-md"
                sideOffset={5}
              >
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase">Switch Role</p>
                </div>
                {roleOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.role}
                    onClick={() => handleRoleSwitch(option.role, option.route)}
                    className={cn(
                      "flex flex-col items-start px-3 py-3 cursor-pointer transition-colors",
                      currentRole === option.role ? "bg-green-50 hover:bg-green-100" : "hover:bg-gray-50",
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          currentRole === option.role ? "text-green-600" : "text-gray-900",
                        )}
                      >
                        {option.role}
                      </span>
                      {currentRole === option.role && (
                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">Active</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{option.description}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {balanceInfo && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded mr-4">
              <span className="text-xs text-gray-600">{balanceInfo.label}:</span>
              <span className="text-sm font-semibold text-green-600">{balanceInfo.value}</span>
            </div>
          )}

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input className="pl-10 w-64" placeholder="Search..." />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Globe size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change language</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-white border border-gray-200 shadow-lg rounded-md"
              sideOffset={5}
            >
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Notifications</p>
              </div>

              <div className="px-3 py-8 text-center text-sm text-gray-500">No notifications</div>

              <div className="px-3 py-2 border-t border-gray-100">
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium w-full text-center">
                  View All Notifications
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 transition-colors p-2">
                <div className="flex flex-col items-end mr-2 hidden md:flex">
                  <span className="text-xs text-gray-500 leading-tight">Administrator</span>
                  <span className="text-sm text-gray-700 font-medium leading-tight">Yasir</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Y</span>
                </div>
                <ChevronDown size={16} className="ml-2 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border border-gray-200 shadow-lg rounded-md"
              sideOffset={5}
            >
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">yasir003</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>

              <DropdownMenuItem
                onClick={handleViewProfile}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <User size={16} className="mr-3 text-gray-500" />
                View Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleSettings}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Settings size={16} className="mr-3 text-gray-500" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 border-gray-100" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
              >
                <LogOut size={16} className="mr-3 text-red-500" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="hidden md:flex border-b overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap hover:text-gray-900",
              isTabActive(tab.route) ? "border-green-500 text-green-500" : "border-transparent text-gray-600",
            )}
            onClick={() => handleTabClick(tab.route)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
