"use client"

import { useState } from "react"
import { useAppContext, type AdminSettings } from "./app-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Save, Trash2, RotateCcw } from "lucide-react"
import { CustomFieldsManager } from "./custom-fields-manager"
import { AdminCredentials } from "./admin-credentials"

export function AdminPanel() {
  const { settings, updateSettings, resetSettings } = useAppContext()
  const [localSettings, setLocalSettings] = useState<AdminSettings>({ ...settings })

  // New item state
  const [newItem, setNewItem] = useState({ name: "", defaultPrice: 0 })
  const [newRegion, setNewRegion] = useState("")
  const [newManager, setNewManager] = useState("")
  const [newSalesperson, setNewSalesperson] = useState("")

  // Save settings
  const handleSaveSettings = () => {
    updateSettings(localSettings)
  }

  // Reset settings
  const handleResetSettings = () => {
    resetSettings()
    setLocalSettings({ ...settings })
  }

  // Add new item
  const handleAddItem = () => {
    if (newItem.name.trim() && newItem.defaultPrice > 0) {
      setLocalSettings({
        ...localSettings,
        items: [...localSettings.items, { ...newItem }],
      })
      setNewItem({ name: "", defaultPrice: 0 })
    }
  }

  // Remove item
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...localSettings.items]
    updatedItems.splice(index, 1)
    setLocalSettings({
      ...localSettings,
      items: updatedItems,
    })
  }

  // Add new region
  const handleAddRegion = () => {
    if (newRegion.trim()) {
      setLocalSettings({
        ...localSettings,
        regions: [...localSettings.regions, newRegion],
      })
      setNewRegion("")
    }
  }

  // Remove region
  const handleRemoveRegion = (index: number) => {
    const updatedRegions = [...localSettings.regions]
    updatedRegions.splice(index, 1)
    setLocalSettings({
      ...localSettings,
      regions: updatedRegions,
    })
  }

  // Add new manager
  const handleAddManager = () => {
    if (newManager.trim()) {
      setLocalSettings({
        ...localSettings,
        managers: [...localSettings.managers, newManager],
      })
      setNewManager("")
    }
  }

  // Remove manager
  const handleRemoveManager = (index: number) => {
    const updatedManagers = [...localSettings.managers]
    updatedManagers.splice(index, 1)
    setLocalSettings({
      ...localSettings,
      managers: updatedManagers,
    })
  }

  // Add new salesperson
  const handleAddSalesperson = () => {
    if (newSalesperson.trim()) {
      setLocalSettings({
        ...localSettings,
        salespeople: [...localSettings.salespeople, newSalesperson],
      })
      setNewSalesperson("")
    }
  }

  // Remove salesperson
  const handleRemoveSalesperson = (index: number) => {
    const updatedSalespeople = [...localSettings.salespeople]
    updatedSalespeople.splice(index, 1)
    setLocalSettings({
      ...localSettings,
      salespeople: updatedSalespeople,
    })
  }

  // Toggle field visibility
  const handleToggleFieldVisibility = (field: string) => {
    setLocalSettings({
      ...localSettings,
      fieldVisibility: {
        ...localSettings.fieldVisibility,
        [field]: !localSettings.fieldVisibility[field],
      },
    })
  }

  // Update auth credentials
  const updateCredentials = (username: string, password: string) => {
    setLocalSettings({
      ...localSettings,
      auth: {
        username,
        password,
      },
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <div className="flex gap-2">
          <Button onClick={handleSaveSettings} className="gap-1">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleResetSettings} className="gap-1">
            <RotateCcw className="h-4 w-4" />
            Reset to Default
          </Button>
        </div>
      </div>

      <Tabs defaultValue="items">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="fields">Form Fields</TabsTrigger>
          <TabsTrigger value="custom-fields">Custom Fields</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Items Tab */}
        <TabsContent value="items" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Items</CardTitle>
              <CardDescription>Add, edit, or remove items and their default prices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex flex-col flex-grow">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>
                <div className="flex flex-col w-32">
                  <Label htmlFor="itemPrice">Default Price</Label>
                  <Input
                    id="itemPrice"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={newItem.defaultPrice || ""}
                    onChange={(e) => setNewItem({ ...newItem, defaultPrice: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <Button className="self-end" onClick={handleAddItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Default Price</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localSettings.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.defaultPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(index)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regions Tab */}
        <TabsContent value="regions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Regions</CardTitle>
              <CardDescription>Add or remove sales regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-grow">
                  <Input
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    placeholder="Enter region name"
                  />
                </div>
                <Button onClick={handleAddRegion}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region Name</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localSettings.regions.map((region, index) => (
                    <TableRow key={index}>
                      <TableCell>{region}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveRegion(index)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* People Tab */}
        <TabsContent value="people" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Managers */}
            <Card>
              <CardHeader>
                <CardTitle>Managers</CardTitle>
                <CardDescription>Add or remove managers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-grow">
                    <Input
                      value={newManager}
                      onChange={(e) => setNewManager(e.target.value)}
                      placeholder="Enter manager name"
                    />
                  </div>
                  <Button onClick={handleAddManager}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Manager Name</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {localSettings.managers.map((manager, index) => (
                      <TableRow key={index}>
                        <TableCell>{manager}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveManager(index)}
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Salespeople */}
            <Card>
              <CardHeader>
                <CardTitle>Salespeople</CardTitle>
                <CardDescription>Add or remove salespeople</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-grow">
                    <Input
                      value={newSalesperson}
                      onChange={(e) => setNewSalesperson(e.target.value)}
                      placeholder="Enter salesperson name"
                    />
                  </div>
                  <Button onClick={handleAddSalesperson}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Salesperson Name</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {localSettings.salespeople.map((salesperson, index) => (
                      <TableRow key={index}>
                        <TableCell>{salesperson}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSalesperson(index)}
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Form Fields Tab */}
        <TabsContent value="fields" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Fields Visibility</CardTitle>
              <CardDescription>Toggle which fields are visible in the data entry form</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field Name</TableHead>
                    <TableHead>Visible</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(localSettings.fieldVisibility).map(([field, isVisible]) => (
                    <TableRow key={field}>
                      <TableCell className="capitalize">{field.replace(/([A-Z])/g, " $1").trim()}</TableCell>
                      <TableCell>
                        <Switch checked={isVisible} onCheckedChange={() => handleToggleFieldVisibility(field)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom Fields Tab */}
        <TabsContent value="custom-fields" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Fields Management</CardTitle>
              <CardDescription>Create, edit, and delete custom fields for your sales data</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomFieldsManager
                customFields={localSettings.customFields}
                setCustomFields={(fields) =>
                  setLocalSettings({
                    ...localSettings,
                    customFields: fields,
                  })
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Credentials</CardTitle>
              <CardDescription>Update your admin username and password</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCredentials
                currentUsername={localSettings.auth.username}
                currentPassword={localSettings.auth.password}
                updateCredentials={updateCredentials}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

