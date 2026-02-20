"use client"
import { useState } from "react"
import { Plus, Search, Filter, ChevronDown, ExternalLink, Eye, Pencil, Trash2, ArrowLeft, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function SiteZoneContent() {
  const [sites, setSites] = useState([
    {
      id: 1,
      name: "Tech Blogi",
      url: "https://techblogi.com/",
      category: "Technology",
      status: "Approved",
      zones: 10,
      addedDate: "Jan 13, 2026",
      description: "Technology blog covering latest tech news and reviews",
      siteType: "Blog",
    },
  ])

  const [zones, setZones] = useState([
    {
      id: 201,
      name: "Header Banner",
      site: "techblogi.com",
      format: "Display",
      size: "728x90",
      status: "Live",
    },
    {
      id: 202,
      name: "Top Leaderboard",
      site: "techblogi.com",
      format: "Display",
      size: "970x90",
      status: "Live",
    },
    {
      id: 203,
      name: "Sidebar Rectangle",
      site: "techblogi.com",
      format: "Display",
      size: "300x250",
      status: "Live",
    },
    {
      id: 204,
      name: "Sidebar Large Rectangle",
      site: "techblogi.com",
      format: "Display",
      size: "336x280",
      status: "Live",
    },
    {
      id: 205,
      name: "Footer Banner",
      site: "techblogi.com",
      format: "Display",
      size: "728x90",
      status: "Live",
    },
    {
      id: 206,
      name: "In-Article Banner",
      site: "techblogi.com",
      format: "Display",
      size: "300x250",
      status: "Live",
    },
    {
      id: 207,
      name: "Sticky Footer Ad",
      site: "techblogi.com",
      format: "Display",
      size: "320x50",
      status: "Live",
    },
    {
      id: 208,
      name: "Mobile Banner",
      site: "techblogi.com",
      format: "Mobile",
      size: "320x100",
      status: "Live",
    },
    {
      id: 209,
      name: "Interstitial",
      site: "techblogi.com",
      format: "Interstitial",
      size: "Full Screen",
      status: "Live",
    },
    {
      id: 210,
      name: "Video Pre-Roll",
      site: "techblogi.com",
      format: "Video",
      size: "16:9",
      status: "Live",
    },
  ])

  const [viewingSite, setViewingSite] = useState<(typeof sites)[0] | null>(null)
  const [viewingZone, setViewingZone] = useState<(typeof zones)[0] | null>(null)

  const [editingSite, setEditingSite] = useState<(typeof sites)[0] | null>(null)
  const [editingZone, setEditingZone] = useState<(typeof zones)[0] | null>(null)
  const [editSiteData, setEditSiteData] = useState({
    name: "",
    url: "",
    category: "",
    status: "",
    description: "",
    siteType: "",
  })
  const [editZoneData, setEditZoneData] = useState({ name: "", format: "", size: "", status: "" })

  const [addSiteModalOpen, setAddSiteModalOpen] = useState(false)
  const [addZoneModalOpen, setAddZoneModalOpen] = useState(false)
  const [addSiteStep, setAddSiteStep] = useState(1)
  const [addZoneStep, setAddZoneStep] = useState(1)
  const [newSiteData, setNewSiteData] = useState({ name: "", url: "", category: "", siteType: "", description: "" })
  const [newZoneData, setNewZoneData] = useState({ name: "", site: "", format: "", size: "" })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: "site" | "zone"; id: number } | null>(null)

  const handleViewSite = (siteId: number) => {
    const site = sites.find((s) => s.id === siteId)
    if (site) setViewingSite(site)
  }

  const handleViewZone = (zoneId: number) => {
    const zone = zones.find((z) => z.id === zoneId)
    if (zone) setViewingZone(zone)
  }

  const handleEditSite = (siteId: number) => {
    const site = sites.find((s) => s.id === siteId)
    if (site) {
      setEditingSite(site)
      setEditSiteData({
        name: site.name,
        url: site.url,
        category: site.category,
        status: site.status,
        description: site.description || "",
        siteType: site.siteType || "",
      })
    }
  }

  const handleEditZone = (zoneId: number) => {
    const zone = zones.find((z) => z.id === zoneId)
    if (zone) {
      setEditingZone(zone)
      setEditZoneData({
        name: zone.name,
        format: zone.format,
        size: zone.size,
        status: zone.status,
      })
    }
  }

  const handleSaveSiteEdit = () => {
    if (editingSite) {
      setSites(sites.map((s) => (s.id === editingSite.id ? { ...s, ...editSiteData } : s)))
      setEditingSite(null)
    }
  }

  const handleSaveZoneEdit = () => {
    if (editingZone) {
      setZones(zones.map((z) => (z.id === editingZone.id ? { ...z, ...editZoneData } : z)))
      setEditingZone(null)
    }
  }

  const handleDeleteSite = (siteId: number) => {
    setItemToDelete({ type: "site", id: siteId })
    setDeleteDialogOpen(true)
  }

  const handleDeleteZone = (zoneId: number) => {
    setItemToDelete({ type: "zone", id: zoneId })
    setDeleteDialogOpen(true)
  }

  const handleAddNewSite = () => {
    setNewSiteData({ name: "", url: "", category: "", siteType: "", description: "" })
    setAddSiteStep(1)
    setAddSiteModalOpen(true)
  }

  const handleAddNewZone = () => {
    setNewZoneData({ name: "", site: sites[0]?.url || "", format: "", size: "" })
    setAddZoneStep(1)
    setAddZoneModalOpen(true)
  }

  const handleSubmitNewSite = () => {
    const newSite = {
      id: Math.max(...sites.map((s) => s.id), 0) + 1,
      name: newSiteData.name,
      url: newSiteData.url,
      category: newSiteData.category,
      status: "Pending Approval",
      zones: 0,
      addedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      description: newSiteData.description,
      siteType: newSiteData.siteType,
    }
    setSites([...sites, newSite])
    setAddSiteModalOpen(false)
  }

  const handleSubmitNewZone = () => {
    const newZone = {
      id: Math.max(...zones.map((z) => z.id), 0) + 1,
      name: newZoneData.name,
      site: newZoneData.site.replace("https://", "").replace("/", ""),
      format: newZoneData.format,
      size: newZoneData.size,
      status: "Live",
    }
    setZones([...zones, newZone])
    setAddZoneModalOpen(false)
  }

  const handleExportData = (type: "sites" | "zones") => {
    const data = type === "sites" ? sites : zones
    const csvContent =
      type === "sites"
        ? "ID,Name,URL,Category,Status,Zones,Added Date\n" +
          sites.map((s) => `${s.id},${s.name},${s.url},${s.category},${s.status},${s.zones},${s.addedDate}`).join("\n")
        : "ID,Name,Site,Format,Size,Status\n" +
          zones.map((z) => `${z.id},${z.name},${z.site},${z.format},${z.size},${z.status}`).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${type}-export-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const confirmDelete = () => {
    if (!itemToDelete) return

    if (itemToDelete.type === "site") {
      setSites(sites.filter((s) => s.id !== itemToDelete.id))
    } else {
      setZones(zones.filter((z) => z.id !== itemToDelete.id))
    }

    setDeleteDialogOpen(false)
    setItemToDelete(null)
  }

  if (viewingSite) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setViewingSite(null)} className="flex items-center bg-white">
              <ArrowLeft size={16} className="mr-2" />
              Back to Sites
            </Button>
            <h1 className="text-2xl font-bold">Site Details</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => handleExportData("sites")}
            className="flex items-center bg-transparent"
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-500 text-sm">Site Name</Label>
              <p className="font-medium text-lg">{viewingSite.name}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">URL</Label>
              <a
                href={viewingSite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                {viewingSite.url}
                <ExternalLink size={14} />
              </a>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Category</Label>
              <p className="font-medium">{viewingSite.category}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Status</Label>
              <Badge className="bg-green-500 text-white">{viewingSite.status}</Badge>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Site Type</Label>
              <p className="font-medium">{viewingSite.siteType || "N/A"}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Zones</Label>
              <p className="font-medium">{viewingSite.zones}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Added Date</Label>
              <p className="font-medium">{viewingSite.addedDate}</p>
            </div>
            <div className="md:col-span-2">
              <Label className="text-gray-500 text-sm">Description</Label>
              <p className="font-medium">{viewingSite.description || "No description provided"}</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (viewingZone) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setViewingZone(null)} className="flex items-center bg-white">
              <ArrowLeft size={16} className="mr-2" />
              Back to Zones
            </Button>
            <h1 className="text-2xl font-bold">Zone Details</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => handleExportData("zones")}
            className="flex items-center bg-transparent"
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-500 text-sm">Zone Name</Label>
              <p className="font-medium text-lg">{viewingZone.name}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Zone ID</Label>
              <p className="font-medium">{viewingZone.id}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Site</Label>
              <p className="font-medium">{viewingZone.site}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Format</Label>
              <p className="font-medium">{viewingZone.format}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Size</Label>
              <p className="font-medium">{viewingZone.size}</p>
            </div>
            <div>
              <Label className="text-gray-500 text-sm">Status</Label>
              <Badge className="bg-green-500 text-white">{viewingZone.status}</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Zone Code</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`<script async src="https://ads.example.com/zone/${viewingZone.id}"></script>
<ins class="ad-zone" data-zone-id="${viewingZone.id}" style="display:inline-block;width:${viewingZone.size.split("x")[0]}px;height:${viewingZone.size.split("x")[1] || "auto"}"></ins>`}
          </pre>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Sites & Zones</h1>
        <Button onClick={handleAddNewSite} className="bg-green-500 hover:bg-green-600 flex items-center">
          <Plus size={16} className="mr-2" />
          Add New Site
        </Button>
      </div>

      <Tabs defaultValue="sites">
        <TabsList className="mb-6 overflow-x-auto flex w-full">
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="sites" className="space-y-6">
          <Card className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input className="pl-10" placeholder="Search sites..." />
              </div>
              <Button variant="outline" className="flex items-center whitespace-nowrap bg-transparent">
                <Filter size={16} className="mr-2" />
                Status
                <ChevronDown size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="flex items-center whitespace-nowrap bg-transparent">
                <Filter size={16} className="mr-2" />
                Category
                <ChevronDown size={16} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportData("sites")}
                className="flex items-center whitespace-nowrap bg-transparent"
              >
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Site Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">URL</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Zones</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.map((site) => (
                    <tr key={site.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{site.name}</p>
                          <p className="text-xs text-gray-500">Added {site.addedDate}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                        >
                          {site.url}
                          <ExternalLink size={12} />
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{site.category}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            site.status === "Approved"
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-yellow-500 text-white hover:bg-yellow-600"
                          }
                        >
                          {site.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{site.zones}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleViewSite(site.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            title="View site details"
                          >
                            <Eye size={14} />
                          </Button>
                          <Button
                            onClick={() => handleEditSite(site.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            title="Edit site"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            onClick={() => handleDeleteSite(site.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 bg-transparent"
                            title="Delete site"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-6">
          <Card className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input className="pl-10" placeholder="Search zones..." />
              </div>
              <Button variant="outline" className="flex items-center whitespace-nowrap bg-transparent">
                <Filter size={16} className="mr-2" />
                Site
                <ChevronDown size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="flex items-center whitespace-nowrap bg-transparent">
                <Filter size={16} className="mr-2" />
                Format
                <ChevronDown size={16} className="ml-2" />
              </Button>
              <Button variant="outline" className="flex items-center whitespace-nowrap bg-transparent">
                <Filter size={16} className="mr-2" />
                Status
                <ChevronDown size={16} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportData("zones")}
                className="flex items-center whitespace-nowrap bg-transparent"
              >
                <Download size={16} className="mr-2" />
                Export
              </Button>
              <Button onClick={handleAddNewZone} className="bg-green-500 hover:bg-green-600 flex items-center">
                <Plus size={16} className="mr-2" />
                Add Zone
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Zone Name</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Site</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Format</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((zone) => (
                    <tr key={zone.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{zone.name}</p>
                          <p className="text-xs text-gray-500">Zone ID: {zone.id}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{zone.site}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{zone.format}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{zone.size}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-500 text-white hover:bg-green-600">{zone.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleViewZone(zone.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            title="View zone details"
                          >
                            <Eye size={14} />
                          </Button>
                          <Button
                            onClick={() => handleEditZone(zone.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            title="Edit zone"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            onClick={() => handleDeleteZone(zone.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 bg-transparent"
                            title="Delete zone"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Site Settings</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-gray-400 mb-2">
                <Plus className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-500 font-medium">No sites configured</p>
              <p className="text-sm text-gray-400">Add a site to configure settings</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {itemToDelete?.type === "site" ? "site and all its zones" : "zone"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Site Modal */}
      <Dialog open={!!editingSite} onOpenChange={(open) => !open && setEditingSite(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Site</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Site Name</Label>
              <Input
                value={editSiteData.name}
                onChange={(e) => setEditSiteData({ ...editSiteData, name: e.target.value })}
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={editSiteData.url}
                onChange={(e) => setEditSiteData({ ...editSiteData, url: e.target.value })}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={editSiteData.category}
                onValueChange={(v) => setEditSiteData({ ...editSiteData, category: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Site Type</Label>
              <Select
                value={editSiteData.siteType}
                onValueChange={(v) => setEditSiteData({ ...editSiteData, siteType: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blog">Blog</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Forum">Forum</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={editSiteData.description}
                onChange={(e) => setEditSiteData({ ...editSiteData, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingSite(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSiteEdit} className="bg-green-500 hover:bg-green-600">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Zone Modal */}
      <Dialog open={!!editingZone} onOpenChange={(open) => !open && setEditingZone(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Zone</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Zone Name</Label>
              <Input
                value={editZoneData.name}
                onChange={(e) => setEditZoneData({ ...editZoneData, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Format</Label>
              <Select
                value={editZoneData.format}
                onValueChange={(v) => setEditZoneData({ ...editZoneData, format: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Display">Display</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Interstitial">Interstitial</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Size</Label>
              <Select value={editZoneData.size} onValueChange={(v) => setEditZoneData({ ...editZoneData, size: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="728x90">728x90</SelectItem>
                  <SelectItem value="970x90">970x90</SelectItem>
                  <SelectItem value="300x250">300x250</SelectItem>
                  <SelectItem value="336x280">336x280</SelectItem>
                  <SelectItem value="320x50">320x50</SelectItem>
                  <SelectItem value="320x100">320x100</SelectItem>
                  <SelectItem value="Full Screen">Full Screen</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={editZoneData.status}
                onValueChange={(v) => setEditZoneData({ ...editZoneData, status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Live">Live</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setEditingZone(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveZoneEdit} className="bg-green-500 hover:bg-green-600">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Site Modal - Step Flow */}
      <Dialog open={addSiteModalOpen} onOpenChange={setAddSiteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Site - Step {addSiteStep} of 3</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {addSiteStep === 1 && (
              <>
                <p className="text-sm text-gray-500 mb-4">Site Details</p>
                <div>
                  <Label>Site Name</Label>
                  <Input
                    value={newSiteData.name}
                    onChange={(e) => setNewSiteData({ ...newSiteData, name: e.target.value })}
                    placeholder="Enter site name"
                  />
                </div>
                <div>
                  <Label>URL</Label>
                  <Input
                    value={newSiteData.url}
                    onChange={(e) => setNewSiteData({ ...newSiteData, url: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={newSiteData.description}
                    onChange={(e) => setNewSiteData({ ...newSiteData, description: e.target.value })}
                    placeholder="Brief description of your site"
                  />
                </div>
              </>
            )}
            {addSiteStep === 2 && (
              <>
                <p className="text-sm text-gray-500 mb-4">Category & Type</p>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={newSiteData.category}
                    onValueChange={(v) => setNewSiteData({ ...newSiteData, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Site Type</Label>
                  <Select
                    value={newSiteData.siteType}
                    onValueChange={(v) => setNewSiteData({ ...newSiteData, siteType: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blog">Blog</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Forum">Forum</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            {addSiteStep === 3 && (
              <>
                <p className="text-sm text-gray-500 mb-4">Review & Submit</p>
                <Card className="p-4 bg-gray-50">
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {newSiteData.name}
                    </p>
                    <p>
                      <span className="font-medium">URL:</span> {newSiteData.url}
                    </p>
                    <p>
                      <span className="font-medium">Category:</span> {newSiteData.category}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span> {newSiteData.siteType}
                    </p>
                    <p>
                      <span className="font-medium">Description:</span> {newSiteData.description || "N/A"}
                    </p>
                  </div>
                </Card>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                  New sites will be submitted with "Pending Approval" status. Ads cannot run until the site is approved.
                </div>
              </>
            )}
            <div className="flex justify-between pt-4">
              {addSiteStep > 1 ? (
                <Button variant="outline" onClick={() => setAddSiteStep(addSiteStep - 1)}>
                  Back
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setAddSiteModalOpen(false)}>
                  Cancel
                </Button>
              )}
              {addSiteStep < 3 ? (
                <Button
                  onClick={() => setAddSiteStep(addSiteStep + 1)}
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={addSiteStep === 1 && (!newSiteData.name || !newSiteData.url)}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmitNewSite} className="bg-green-500 hover:bg-green-600">
                  Submit Site
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Zone Modal - Step Flow */}
      <Dialog open={addZoneModalOpen} onOpenChange={setAddZoneModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Zone - Step {addZoneStep} of 3</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {addZoneStep === 1 && (
              <>
                <p className="text-sm text-gray-500 mb-4">Zone Details</p>
                <div>
                  <Label>Zone Name</Label>
                  <Input
                    value={newZoneData.name}
                    onChange={(e) => setNewZoneData({ ...newZoneData, name: e.target.value })}
                    placeholder="Enter zone name"
                  />
                </div>
                <div>
                  <Label>Site</Label>
                  <Select value={newZoneData.site} onValueChange={(v) => setNewZoneData({ ...newZoneData, site: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select site" />
                    </SelectTrigger>
                    <SelectContent>
                      {sites.map((site) => (
                        <SelectItem key={site.id} value={site.url}>
                          {site.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            {addZoneStep === 2 && (
              <>
                <p className="text-sm text-gray-500 mb-4">Ad Format & Size</p>
                <div>
                  <Label>Format</Label>
                  <Select
                    value={newZoneData.format}
                    onValueChange={(v) => setNewZoneData({ ...newZoneData, format: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Display">Display</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="Interstitial">Interstitial</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Native">Native</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Size</Label>
                  <Select value={newZoneData.size} onValueChange={(v) => setNewZoneData({ ...newZoneData, size: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="728x90">728x90 (Leaderboard)</SelectItem>
                      <SelectItem value="970x90">970x90 (Large Leaderboard)</SelectItem>
                      <SelectItem value="300x250">300x250 (Rectangle)</SelectItem>
                      <SelectItem value="336x280">336x280 (Large Rectangle)</SelectItem>
                      <SelectItem value="320x50">320x50 (Mobile Banner)</SelectItem>
                      <SelectItem value="320x100">320x100 (Large Mobile)</SelectItem>
                      <SelectItem value="Full Screen">Full Screen</SelectItem>
                      <SelectItem value="16:9">16:9 (Video)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            {addZoneStep === 3 && (
              <>
                <p className="text-sm text-gray-500 mb-4">Review & Submit</p>
                <Card className="p-4 bg-gray-50">
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {newZoneData.name}
                    </p>
                    <p>
                      <span className="font-medium">Site:</span> {newZoneData.site}
                    </p>
                    <p>
                      <span className="font-medium">Format:</span> {newZoneData.format}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span> {newZoneData.size}
                    </p>
                  </div>
                </Card>
              </>
            )}
            <div className="flex justify-between pt-4">
              {addZoneStep > 1 ? (
                <Button variant="outline" onClick={() => setAddZoneStep(addZoneStep - 1)}>
                  Back
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setAddZoneModalOpen(false)}>
                  Cancel
                </Button>
              )}
              {addZoneStep < 3 ? (
                <Button
                  onClick={() => setAddZoneStep(addZoneStep + 1)}
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={addZoneStep === 1 && (!newZoneData.name || !newZoneData.site)}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmitNewZone} className="bg-green-500 hover:bg-green-600">
                  Create Zone
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
