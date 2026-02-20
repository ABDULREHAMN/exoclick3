"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify Your Email</h2>
          <p className="text-gray-600 mb-6">
            Please check your email inbox for a verification link. Click on the link to verify your email address.
          </p>
          <Link href="/login">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-md transition-colors">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
