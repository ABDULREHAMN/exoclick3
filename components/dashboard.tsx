"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { TopNavbar } from "./top-navbar"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { DashboardContent } from "./dashboard-content"
import { PaymentContent } from "./payment-content"
import { ReportContent } from "./report-content"
import { SiteZoneContent } from "./site-zone-content"
import { SettingsModal } from "./settings-modal"
import { KycProvider } from "./kyc-context"
import { NotificationProvider } from "./notification-context"
import { NoCampaignsMessage } from "./no-campaigns-message"
import { KycModal } from "./kyc-modal"
import { SettingsContent } from "./settings-content"
import { ProfileModal } from "./profile-modal"
import LiveChatBot from "./live-chat-bot"

type PageType = "dashboard" | "payments" | "reports" | "sites" | "campaigns" | "settings" | "profile"

function DashboardContentWrapper() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const getActiveSectionFromPath = (): PageType => {
    if (pathname === "/dashboard") return "dashboard"
    if (pathname === "/statistics") return "reports"
    if (pathname === "/sites-zones") return "sites"
    if (pathname === "/payments") return "payments"
    if (pathname === "/settings") return "settings"
    return "dashboard"
  }

  const activeSection = getActiveSectionFromPath()

  const setActiveSection = (section: PageType) => {
    if (section === "dashboard") router.push("/dashboard")
    else if (section === "reports") router.push("/statistics")
    else if (section === "sites") router.push("/sites-zones")
    else if (section === "payments") router.push("/payments")
    else if (section === "campaigns") router.push("/campaigns")
    else if (section === "settings") router.push("/settings")
  }

  const handleNavigation = (page: string) => {
    if (page === "profile-modal") {
      setIsProfileModalOpen(true)
    } else if (page === "settings-modal") {
      setIsSettingsModalOpen(true)
    } else if (page === "toggle-sidebar") {
      setIsSidebarOpen(!isSidebarOpen)
    }
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  useEffect(() => {
    // Only enable on mobile devices
    const isMobile = window.matchMedia("(max-width: 1023px)").matches

    if (!isMobile) return

    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger from edge (first 50px from left or right)
      const touchX = e.touches[0].clientX
      const screenWidth = window.innerWidth

      if (touchX < 50 || touchX > screenWidth - 50) {
        touchStartX.current = touchX
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      const swipeDistance = touchEndX.current - touchStartX.current
      const minSwipeDistance = 50

      // Swipe right from left edge - open sidebar
      if (touchStartX.current < 50 && swipeDistance > minSwipeDistance) {
        setIsSidebarOpen(true)
      }

      // Swipe left - close sidebar
      if (swipeDistance < -minSwipeDistance && isSidebarOpen) {
        setIsSidebarOpen(false)
      }

      // Reset values
      touchStartX.current = 0
      touchEndX.current = 0
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("touchmove", handleTouchMove)
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isSidebarOpen])

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isSidebarOpen])

  return (
    <div className="flex h-screen bg-[#f5f5f5] relative">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
      <div className="flex flex-col flex-1 overflow-hidden pb-16 lg:pb-0 w-full">
        <TopNavbar onNavigate={handleNavigation} />
        <div className="flex-1 overflow-auto">
          {activeSection === "dashboard" && <DashboardContent />}
          {activeSection === "payments" && <PaymentContent />}
          {activeSection === "reports" && <ReportContent />}
          {activeSection === "sites" && <SiteZoneContent />}
          {activeSection === "campaigns" && <NoCampaignsMessage />}
          {activeSection === "settings" && <SettingsContent />}
        </div>
      </div>
      <MobileBottomNav onMoreClick={() => setIsSidebarOpen(true)} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <KycModal />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
      <LiveChatBot />
    </div>
  )
}

export function Dashboard() {
  return (
    <NotificationProvider>
      <KycProvider>
        <DashboardContentWrapper />
      </KycProvider>
    </NotificationProvider>
  )
}
