"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
  }

  return (
    <div className="min-h-screen bg-[#1e2a38] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-white">EXO</span>
            <span className="text-green-500">Click</span>
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Forgot Password</h2>

          {success ? (
            <div>
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm mb-4">
                Password reset instructions have been sent to your email.
              </div>
              <Link href="/login">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition-colors">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-gray-600 text-sm mb-4">
                Enter your email address and we'll send you instructions to reset your password.
              </p>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition-colors"
              >
                Send Reset Instructions
              </Button>

              <div className="text-center">
                <Link href="/login" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
