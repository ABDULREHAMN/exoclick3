"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ExoClickHeader() {
  const [langOpen, setLangOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <img src="/new-exoclick-logo.jpg" alt="ExoClick" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#" className="text-gray-700 hover:text-[#0088cc] text-sm font-medium transition-colors">
              Advertisers
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#0088cc] text-sm font-medium transition-colors">
              Publishers
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#0088cc] text-sm font-medium transition-colors">
              Academy
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#0088cc] text-sm font-medium transition-colors">
              Ad Formats
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#0088cc] text-sm font-medium transition-colors">
              About Us
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#0088cc] text-sm font-medium transition-colors">
              Help
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link href="/signup">
              <Button className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 h-9 rounded-full text-sm font-semibold uppercase">
                SIGNUP
              </Button>
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-[#0088cc] text-sm font-medium transition-colors">
              Login
            </Link>
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-[#0088cc] text-sm font-medium transition-colors"
              >
                EN
                <ChevronDown size={16} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg py-1">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">English</button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">Español</button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">Français</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
