"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SettingsContent() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")
    setIsUpdatingPassword(true)

    // Validate current password (hardcoded for now - should match login logic)
    if (currentPassword !== "ABR$786@") {
      setPasswordError("Current password is incorrect")
      setIsUpdatingPassword(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match")
      setIsUpdatingPassword(false)
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      setIsUpdatingPassword(false)
      return
    }

    // Password change successful - invalidate all sessions globally
    setTimeout(() => {
      setPasswordSuccess("Password updated successfully. Logging out all sessions...")
      
      // Set session invalidation flag for all tabs/windows
      localStorage.setItem("sessionInvalidated", Date.now().toString())
      sessionStorage.clear()
      
      // Broadcast force logout to all tabs/windows
      window.dispatchEvent(new Event("forceLogout"))
      
      // Clear storage and redirect to login after brief delay
      setTimeout(() => {
        localStorage.clear()
        window.location.href = "/login"
      }, 1500)
    }, 500)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Settings Tabs */}
      <Tabs defaultValue="account">
        <TabsList className="mb-6 overflow-x-auto flex w-full">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" defaultValue="Abdul Rehman" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue="abdulrehmanseoexperti@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" defaultValue="rehseo007" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter your company name" />
              </div>
            </div>
            <div className="mt-6">
              <Button className="bg-green-500 hover:bg-green-600">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Password</h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && (
                <div className="text-red-600 text-sm font-medium">{passwordError}</div>
              )}
              {passwordSuccess && (
                <div className="text-green-600 text-sm font-medium">{passwordSuccess}</div>
              )}
              <Button 
                type="submit" 
                className="bg-green-500 hover:bg-green-600"
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Two-Factor Authentication</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <Switch />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Email Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Notifications</p>
                  <p className="text-sm text-gray-500">Receive emails about your payments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Account Updates</p>
                  <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-gray-500">Receive emails about new features and offers</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID</Label>
                <Input id="tax-id" placeholder="Enter your tax ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-email">Billing Email</Label>
                <Input
                  id="billing-email"
                  type="email"
                  placeholder="Enter your billing email"
                  defaultValue="abdulrehmanseoexperti@gmail.com"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button className="bg-green-500 hover:bg-green-600">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">API Keys</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Publisher API Key</p>
                  <p className="text-sm text-gray-500">Use this key to access the Publisher API</p>
                </div>
                <Button variant="outline">Generate Key</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reports API Key</p>
                  <p className="text-sm text-gray-500">Use this key to access the Reports API</p>
                </div>
                <Button variant="outline">Generate Key</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
