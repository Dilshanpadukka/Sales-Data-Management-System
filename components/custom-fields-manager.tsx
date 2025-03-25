"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Trash2, Edit, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type CustomField = {
  id: string
  name: string
  type: "text" | "number" | "select"
  options?: string[]
  required: boolean
}

interface CustomFieldsManagerProps {
  customFields: CustomField[]
  setCustomFields: (fields: CustomField[]) => void
}

export function CustomFieldsManager({ customFields, setCustomFields }: CustomFieldsManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentField, setCurrentField] = useState<CustomField | null>(null)
  const [newField, setNewField] = useState<Omit<CustomField, "id">>({
    name: "",
    type: "text",
    required: false,
  })
  const [newOption, setNewOption] = useState("")

  // Add a new custom field
  const handleAddField = () => {
    if (newField.name.trim()) {
      const field: CustomField = {
        ...newField,
        id: `custom_${Date.now()}`,
        options: newField.type === "select" ? newField.options || [] : undefined,
      }

      setCustomFields([...customFields, field])
      setNewField({
        name: "",
        type: "text",
        required: false,
      })
      setIsAddDialogOpen(false)
    }
  }

  // Edit an existing custom field
  const handleEditField = () => {
    if (currentField && currentField.name.trim()) {
      setCustomFields(customFields.map((field) => (field.id === currentField.id ? currentField : field)))
      setCurrentField(null)
      setIsEditDialogOpen(false)
    }
  }

  // Delete a custom field
  const handleDeleteField = (id: string) => {
    setCustomFields(customFields.filter((field) => field.id !== id))
  }

  // Add option to select field
  const handleAddOption = () => {
    if (newOption.trim()) {
      if (isAddDialogOpen) {
        setNewField({
          ...newField,
          options: [...(newField.options || []), newOption],
        })
      } else if (isEditDialogOpen && currentField) {
        setCurrentField({
          ...currentField,
          options: [...(currentField.options || []), newOption],
        })
      }
      setNewOption("")
    }
  }

  // Remove option from select field
  const handleRemoveOption = (option: string) => {
    if (isAddDialogOpen) {
      setNewField({
        ...newField,
        options: newField.options?.filter((o) => o !== option),
      })
    } else if (isEditDialogOpen && currentField) {
      setCurrentField({
        ...currentField,
        options: currentField.options?.filter((o) => o !== option),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Custom Fields</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      {customFields.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No custom fields have been created yet. Click "Add Field" to create your first custom field.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Required</TableHead>
              <TableHead>Options</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customFields.map((field) => (
              <TableRow key={field.id}>
                <TableCell>{field.name}</TableCell>
                <TableCell className="capitalize">{field.type}</TableCell>
                <TableCell>{field.required ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {field.type === "select" && field.options && (
                    <div className="flex flex-wrap gap-1">
                      {field.options.map((option) => (
                        <Badge key={option} variant="outline">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentField(field)
                        setIsEditDialogOpen(true)
                      }}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteField(field.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Add Field Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Custom Field</DialogTitle>
            <DialogDescription>Create a new custom field for your sales data.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fieldName" className="text-right">
                Field Name
              </Label>
              <Input
                id="fieldName"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                className="col-span-3"
                placeholder="e.g., Customer Name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fieldType" className="text-right">
                Field Type
              </Label>
              <Select
                value={newField.type}
                onValueChange={(value: "text" | "number" | "select") =>
                  setNewField({ ...newField, type: value, options: value === "select" ? [] : undefined })
                }
              >
                <SelectTrigger className="col-span-3" id="fieldType">
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="select">Dropdown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="required" className="text-right">
                Required
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="required"
                  checked={newField.required}
                  onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                />
                <Label htmlFor="required">Make this field required</Label>
              </div>
            </div>

            {newField.type === "select" && (
              <div className="grid grid-cols-4 gap-4">
                <Label className="text-right pt-2">Options</Label>
                <div className="col-span-3 space-y-4">
                  <div className="flex space-x-2">
                    <Input value={newOption} onChange={(e) => setNewOption(e.target.value)} placeholder="Add option" />
                    <Button type="button" onClick={handleAddOption} size="sm">
                      Add
                    </Button>
                  </div>

                  {newField.options && newField.options.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newField.options.map((option) => (
                        <Badge key={option} variant="secondary" className="flex items-center gap-1">
                          {option}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => handleRemoveOption(option)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddField}>
              <Save className="h-4 w-4 mr-2" />
              Create Field
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Field Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Custom Field</DialogTitle>
            <DialogDescription>Modify the custom field properties.</DialogDescription>
          </DialogHeader>

          {currentField && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editFieldName" className="text-right">
                  Field Name
                </Label>
                <Input
                  id="editFieldName"
                  value={currentField.name}
                  onChange={(e) => setCurrentField({ ...currentField, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editFieldType" className="text-right">
                  Field Type
                </Label>
                <Select
                  value={currentField.type}
                  onValueChange={(value: "text" | "number" | "select") =>
                    setCurrentField({
                      ...currentField,
                      type: value,
                      options: value === "select" ? currentField.options || [] : undefined,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3" id="editFieldType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="select">Dropdown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editRequired" className="text-right">
                  Required
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="editRequired"
                    checked={currentField.required}
                    onCheckedChange={(checked) => setCurrentField({ ...currentField, required: checked })}
                  />
                  <Label htmlFor="editRequired">Make this field required</Label>
                </div>
              </div>

              {currentField.type === "select" && (
                <div className="grid grid-cols-4 gap-4">
                  <Label className="text-right pt-2">Options</Label>
                  <div className="col-span-3 space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Add option"
                      />
                      <Button type="button" onClick={handleAddOption} size="sm">
                        Add
                      </Button>
                    </div>

                    {currentField.options && currentField.options.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {currentField.options.map((option) => (
                          <Badge key={option} variant="secondary" className="flex items-center gap-1">
                            {option}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                              onClick={() => handleRemoveOption(option)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditField}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

