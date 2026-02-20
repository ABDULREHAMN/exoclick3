"use client"

import { useState } from "react"
import { X, Lock, Bell, User, Mail, Phone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [contactInfo, setContactInfo] = useState({
    email: "rohanjanean56@gmail.com",
    phone: "+1 (555) 123-4567",
    backupEmail: "",
  })

  const [notifications, setNotifications] = useState({
    emailPayments: true,
    emailAccount: true,
    emailMarketing: false,
    pushNotifications: true,
    smsAlerts: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords don't match!")
      return
    }
    if (passwords.new.length < 8) {
      alert("Password must be at least 8 characters long!")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)

    alert("Password updated successfully!")
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const handleContactUpdate = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    alert("Contact information updated successfully!")
  }

  const handleNotificationUpdate = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)

    alert("Notification preferences updated successfully!")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Settings
          </DialogTitle>
          <DialogDescription>
            Manage your account security, contact information, and notification preferences.
          </DialogDescription>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Info
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="security" className="space-y-6 mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Change Password</h3>
              <p className="text-sm text-blue-700 mb-4">
                Ensure your account is using a long, random password to stay secure.
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                    placeholder="Enter your current password"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                    placeholder="Enter your new password"
                  />
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                    placeholder="Confirm your new password"
                  />
                </div>
                <Button
                  onClick={handlePasswordChange}
                  disabled={isLoading || !passwords.current || !passwords.new || !passwords.confirm}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Two-Factor Authentication</h3>
              <p className="text-sm text-green-700 mb-4">Add an extra layer of security to your account with 2FA.</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Secure your account with SMS or authenticator app</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Login Sessions</h3>
              <p className="text-sm text-yellow-700 mb-4">Manage and monitor your active login sessions.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-gray-500">Chrome on Windows • New York, US</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <p className="font-medium">Mobile App</p>
                    <p className="text-sm text-gray-500">iPhone • Last seen 2 hours ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6 mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Contact Information</h3>
              <p className="text-sm text-blue-700 mb-4">
                Keep your contact information up to date for account security and communication.
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Primary Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="backup-email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Backup Email (Optional)
                  </Label>
                  <Input
                    id="backup-email"
                    type="email"
                    value={contactInfo.backupEmail}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, backupEmail: e.target.value }))}
                    placeholder="Enter backup email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <Button onClick={handleContactUpdate} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  {isLoading ? "Updating..." : "Update Contact Info"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Email Notifications</h3>
              <p className="text-sm text-purple-700 mb-4">Choose which email notifications you'd like to receive.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Notifications</p>
                    <p className="text-sm text-gray-500">Receive emails about payments and withdrawals</p>
                  </div>
                  <Switch
                    checked={notifications.emailPayments}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailPayments: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Account Updates</p>
                    <p className="text-sm text-gray-500">Important account and security updates</p>
                  </div>
                  <Switch
                    checked={notifications.emailAccount}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailAccount: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-500">Product updates, tips, and promotional content</p>
                  </div>
                  <Switch
                    checked={notifications.emailMarketing}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailMarketing: checked }))}
                  />
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Push Notifications</h3>
              <p className="text-sm text-green-700 mb-4">Manage browser and mobile push notifications.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Browser Notifications</p>
                    <p className="text-sm text-gray-500">Real-time notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-gray-500">Critical alerts via text message</p>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, smsAlerts: checked }))}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleNotificationUpdate}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? "Saving..." : "Save Notification Preferences"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
