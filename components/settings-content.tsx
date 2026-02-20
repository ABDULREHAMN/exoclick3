"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SettingsContent() {
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="bg-green-500 hover:bg-green-600">Update Password</Button>
            </div>
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
