"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { TopNavbar } from "./top-navbar"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { SettingsModal } from "./settings-modal"
import { KycProvider } from "./kyc-context"
import { NotificationProvider } from "./notification-context"
import { KycModal } from "./kyc-modal"
import { ProfileModal } from "./profile-modal"

type PageType = "dashboard" | "payments" | "reports" | "sites" | "campaigns" | "settings" | "profile"

interface AppShellProps {
  children: React.ReactNode
}

function AppShellContent({ children }: AppShellProps) {
  const pathname = usePathname()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleNavigation = (page: string) => {
    if (page === "profile-modal") {
      setIsProfileModalOpen(true)
    } else if (page === "settings-modal") {
      setIsSettingsModalOpen(true)
    } else if (page === "toggle-sidebar") {
      const newState = !isSidebarOpen
      setIsSidebarOpen(newState)
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches
      if (isDesktop) {
        localStorage.setItem("sidebar_open_state", newState ? "open" : "collapsed")
      }
    }
  }

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches
    if (isDesktop) {
      const saved = localStorage.getItem("sidebar_open_state")
      if (saved !== null) {
        setIsSidebarOpen(saved !== "collapsed")
      } else {
        setIsSidebarOpen(false)
      }
    }
  }, [])

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isSidebarOpen])

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f5]">
      <TopNavbar onNavigate={handleNavigation} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 overflow-auto pb-16 lg:pb-0">{children}</main>
      </div>

      <MobileBottomNav onMoreClick={() => setIsSidebarOpen(true)} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <KycModal />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
    </div>
  )
}

export function AppShell({ children }: AppShellProps) {
  return (
    <NotificationProvider>
      <KycProvider>
        <AppShellContent>{children}</AppShellContent>
      </KycProvider>
    </NotificationProvider>
  )
}
