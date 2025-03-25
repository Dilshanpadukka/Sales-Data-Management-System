"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format, parse } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext, type SalesRecord } from "./app-provider"
import { cn } from "@/lib/utils"

interface EditSalesRecordDialogProps {
  record: SalesRecord
  isOpen: boolean
  onClose: () => void
}

export function EditSalesRecordDialog({ record, isOpen, onClose }: EditSalesRecordDialogProps) {
  const { updateSalesRecord, settings } = useAppContext()
  const [calculatedAmount, setCalculatedAmount] = useState<number>(record.saleAmount)

  // Create dynamic form schema based on visible fields and custom fields
  const createFormSchema = () => {
    const schemaObj: any = {}

    if (settings.fieldVisibility.orderDate) {
      schemaObj.orderDate = z.date({
        required_error: "Order date is required",
      })
    }

    if (settings.fieldVisibility.region) {
      schemaObj.region = z.string({
        required_error: "Please select a region",
      })
    }

    if (settings.fieldVisibility.manager) {
      schemaObj.manager = z.string().min(2, {
        message: "Manager name must be at least 2 characters",
      })
    }

    if (settings.fieldVisibility.salesMan) {
      schemaObj.salesMan = z.string().min(2, {
        message: "Salesman name must be at least 2 characters",
      })
    }

    if (settings.fieldVisibility.item) {
      schemaObj.item = z.string({
        required_error: "Please select an item",
      })
    }

    if (settings.fieldVisibility.units) {
      schemaObj.units = z.coerce.number().min(1, { message: "Must sell at least 1 unit" })
    }

    if (settings.fieldVisibility.unitPrice) {
      schemaObj.unitPrice = z.coerce.number().min(0.01, { message: "Unit price must be greater than 0" })
    }

    // Add custom fields to schema
    settings.customFields.forEach((field) => {
      if (field.type === "text") {
        schemaObj[field.id] = field.required
          ? z.string().min(1, { message: `${field.name} is required` })
          : z.string().optional()
      } else if (field.type === "number") {
        schemaObj[field.id] = field.required
          ? z.coerce.number({ required_error: `${field.name} is required` })
          : z.coerce.number().optional()
      } else if (field.type === "select") {
        schemaObj[field.id] = field.required
          ? z.string({ required_error: `Please select a ${field.name.toLowerCase()}` })
          : z.string().optional()
      }
    })

    return z.object(schemaObj)
  }

  const formSchema = createFormSchema()

  // Prepare default values for the form
  const prepareDefaultValues = () => {
    const defaultValues: any = {
      orderDate: record.orderDate ? parse(record.orderDate, "yyyy-MM-dd", new Date()) : new Date(),
      region: record.region || "",
      manager: record.manager || "",
      salesMan: record.salesMan || "",
      item: record.item || "",
      units: record.units || 1,
      unitPrice: record.unitPrice || 0,
    }

    // Add custom field values
    if (record.customFieldValues) {
      settings.customFields.forEach((field) => {
        if (record.customFieldValues?.[field.id] !== undefined) {
          defaultValues[field.id] = record.customFieldValues[field.id]
        }
      })
    }

    return defaultValues
  }

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: prepareDefaultValues(),
  })

  // Watch for changes to units and unitPrice to calculate saleAmount
  const units = form.watch("units")
  const unitPrice = form.watch("unitPrice")
  const selectedItem = form.watch("item")

  // Update calculated amount whenever units or unitPrice changes
  useEffect(() => {
    if (units && unitPrice && !isNaN(units) && !isNaN(unitPrice)) {
      const newAmount = units * unitPrice
      setCalculatedAmount(newAmount)
    }
  }, [units, unitPrice])

  // Update unit price when item changes
  useEffect(() => {
    if (selectedItem) {
      const itemData = settings.items.find((item) => item.name === selectedItem)
      if (itemData) {
        form.setValue("unitPrice", itemData.defaultPrice)
      }
    }
  }, [selectedItem, settings.items, form])

  function onSubmit(values: any) {
    const saleAmount = values.units * values.unitPrice

    // Extract custom field values
    const customFieldValues: { [key: string]: string | number } = {}
    settings.customFields.forEach((field) => {
      if (values[field.id] !== undefined) {
        customFieldValues[field.id] = values[field.id]
      }
    })

    // Create updated record
    const updatedRecord: Omit<SalesRecord, "id"> = {
      orderDate: values.orderDate ? format(values.orderDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      region: values.region || "",
      manager: values.manager || "",
      salesMan: values.salesMan || "",
      item: values.item || "",
      units: values.units || 0,
      unitPrice: values.unitPrice || 0,
      saleAmount,
      customFieldValues: Object.keys(customFieldValues).length > 0 ? customFieldValues : undefined,
    }

    updateSalesRecord(record.id, updatedRecord)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Sales Record</DialogTitle>
          <DialogDescription>Update the sales record information below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Date */}
              {settings.fieldVisibility.orderDate && (
                <FormField
                  control={form.control}
                  name="orderDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Order Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Select a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Region */}
              {settings.fieldVisibility.region && (
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {settings.regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Manager */}
              {settings.fieldVisibility.manager && (
                <FormField
                  control={form.control}
                  name="manager"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a manager" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {settings.managers.map((manager) => (
                            <SelectItem key={manager} value={manager}>
                              {manager}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Salesman */}
              {settings.fieldVisibility.salesMan && (
                <FormField
                  control={form.control}
                  name="salesMan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salesman</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a salesperson" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {settings.salespeople.map((salesperson) => (
                            <SelectItem key={salesperson} value={salesperson}>
                              {salesperson}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Item */}
              {settings.fieldVisibility.item && (
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {settings.items.map((item) => (
                            <SelectItem key={item.name} value={item.name}>
                              {item.name} (${item.defaultPrice})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Units */}
              {settings.fieldVisibility.units && (
                <FormField
                  control={form.control}
                  name="units"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Units</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="Number of units" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Unit Price */}
              {settings.fieldVisibility.unitPrice && (
                <FormField
                  control={form.control}
                  name="unitPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0.01" placeholder="Price per unit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Sale Amount (Calculated) */}
              {settings.fieldVisibility.saleAmount && (
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Sale Amount ($)</label>
                  <div className="h-10 px-3 py-2 rounded-md border border-input bg-gray-100 text-sm">
                    ${calculatedAmount.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">Auto-calculated: Units × Unit Price</p>
                </div>
              )}

              {/* Custom Fields */}
              {settings.customFields.map((field) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={field.id}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name}
                        {field.required ? " *" : ""}
                      </FormLabel>
                      {field.type === "text" && (
                        <FormControl>
                          <Input placeholder={`Enter ${field.name.toLowerCase()}`} {...formField} />
                        </FormControl>
                      )}
                      {field.type === "number" && (
                        <FormControl>
                          <Input type="number" placeholder={`Enter ${field.name.toLowerCase()}`} {...formField} />
                        </FormControl>
                      )}
                      {field.type === "select" && field.options && (
                        <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={`Select ${field.name.toLowerCase()}`} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {field.options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

