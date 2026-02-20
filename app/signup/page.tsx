"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ExoClickHeader } from "@/components/exoclick-header"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    companyName: "",
    country: "",
    currency: "",
    accountType: "publisher",
    comments: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    if (!termsAccepted) {
      setError("You must accept the terms and conditions")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.email !== formData.confirmEmail) {
      setError("Email addresses do not match")
      setIsLoading(false)
      return
    }

    const signupData = {
      ...formData,
      signupTime: Date.now(),
      status: "pending_review",
    }

    localStorage.setItem("signupData", JSON.stringify(signupData))

    setSuccess(
      "Signup completed successfully. Your account will be reviewed and approved within 24 hours if all requirements are complete.",
    )
    setIsLoading(false)

    setTimeout(() => {
      router.push("/login")
    }, 3000)
  }

  return (
    <>
      <ExoClickHeader />

      <div className="min-h-screen bg-white flex items-center justify-center p-8 pt-24">
        <div className="w-full max-w-[1000px]">
          <h1 className="text-2xl text-gray-700 text-center mb-10 font-normal">Start the ExoClick experience today</h1>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Left Column - Username */}
              <div className="space-y-1">
                <Label htmlFor="username" className="text-sm text-gray-700 font-normal">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]"
                  required
                />
              </div>

              {/* Right Column - Company Name */}
              <div className="space-y-1">
                <Label htmlFor="companyName" className="text-sm text-gray-700 font-normal">
                  Company name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]"
                  required
                />
              </div>

              {/* Left Column - Password */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm text-gray-700 font-normal">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="w-full h-9 px-3 pr-10 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Right Column - Confirm Password */}
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-sm text-gray-700 font-normal">
                  Confirm password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="w-full h-9 px-3 pr-10 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Left Column - First Name */}
              <div className="space-y-1">
                <Label htmlFor="firstName" className="text-sm text-gray-700 font-normal">
                  First name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]"
                  required
                />
              </div>

              {/* Right Column - Last Name */}
              <div className="space-y-1">
                <Label htmlFor="lastName" className="text-sm text-gray-700 font-normal">
                  Last name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]"
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-300"></div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Left Column - Email */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm text-gray-700 font-normal">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]"
                  required
                />
              </div>

              {/* Right Column - Confirm Email */}
              <div className="space-y-1">
                <Label htmlFor="confirmEmail" className="text-sm text-gray-700 font-normal">
                  Confirm email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  value={formData.confirmEmail}
                  onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
                  className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]"
                  required
                />
              </div>

              {/* Left Column - Country */}
              <div className="space-y-1">
                <Label htmlFor="country" className="text-sm text-gray-700 font-normal">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.country} onValueChange={(val) => handleInputChange("country", val)} required>
                  <SelectTrigger className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]">
                    <SelectValue placeholder="Please select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="pk">Pakistan</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Right Column - Currency */}
              <div className="space-y-1">
                <Label htmlFor="currency" className="text-sm text-gray-700 font-normal">
                  Currency <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.currency} onValueChange={(val) => handleInputChange("currency", val)} required>
                  <SelectTrigger className="w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc]">
                    <SelectValue placeholder="Please select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="pkr">PKR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-t border-gray-300"></div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Left Column - Account Type */}
              <div className="space-y-3">
                <Label className="text-sm text-gray-700 font-normal">Account type</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="publisher"
                      checked={formData.accountType === "publisher"}
                      onChange={(e) => handleInputChange("accountType", e.target.value)}
                      className="w-4 h-4 text-[#0088cc] border-gray-300 focus:ring-[#0088cc]"
                    />
                    <span className="text-sm text-gray-700">
                      Publisher
                      <span className="block text-xs text-red-500">I want to sell traffic</span>
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="advertiser"
                      checked={formData.accountType === "advertiser"}
                      onChange={(e) => handleInputChange("accountType", e.target.value)}
                      className="w-4 h-4 text-[#0088cc] border-gray-300 focus:ring-[#0088cc]"
                    />
                    <span className="text-sm text-gray-700">
                      Advertiser
                      <span className="block text-xs text-red-500">I want to buy traffic</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Right Column - Conditions */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-normal">
                  Conditions <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 mt-0.5 text-[#0088cc] border-gray-300 rounded focus:ring-[#0088cc]"
                    />
                    <span className="text-xs text-gray-700 leading-tight">
                      I read, understand and accept the{" "}
                      <Link href="/terms" className="text-[#0088cc] hover:underline">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#0088cc] hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  <p className="text-xs text-gray-600 leading-tight">
                    EXOCLICK, S.L. as data controller will process your data in order to maintain a relationship with
                    you or the company that you work for, as well as for the sending of commercial communications. You
                    may access, rectify and delete your data, as well as exercise other rights by consulting the
                    additional and detailed information on data protection in our{" "}
                    <Link href="/privacy" className="text-[#0088cc] hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Left Column - Comments */}
              <div className="space-y-1">
                <Label htmlFor="comments" className="text-sm text-gray-700 font-normal">
                  Comments and additional information
                </Label>
                <Textarea
                  id="comments"
                  value={formData.comments}
                  onChange={(e) => handleInputChange("comments", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#0088cc] focus:ring-1 focus:ring-[#0088cc] min-h-[80px] resize-none"
                  placeholder=""
                />
              </div>

              {/* Right Column - Signup Button */}
              <div className="flex items-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 bg-[#0088cc] hover:bg-[#0077b3] text-white font-semibold rounded transition-colors"
                >
                  {isLoading ? "SIGNING UP..." : "SIGNUP"}
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{error}</div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
                {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
