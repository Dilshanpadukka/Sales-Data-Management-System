"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Types
export type SalesRecord = {
  id: string
  orderDate: string
  region: string
  manager: string
  salesMan: string
  item: string
  units: number
  unitPrice: number
  saleAmount: number
  customFieldValues?: { [key: string]: string | number }
}

// Add these types and functions to the AppContextType interface
type CustomField = {
  id: string
  name: string
  type: "text" | "number" | "select"
  options?: string[] // For select type fields
  required: boolean
}

// Update the AdminSettings type to include customFields and auth credentials
export type AdminSettings = {
  regions: string[]
  items: { name: string; defaultPrice: number }[]
  managers: string[]
  salespeople: string[]
  fieldVisibility: {
    [key: string]: boolean
  }
  customFields: CustomField[]
  auth: {
    username: string
    password: string
  }
}

type AppContextType = {
  // Sales data management
  salesData: SalesRecord[]
  addSalesRecord: (record: Omit<SalesRecord, "id">) => void
  updateSalesRecord: (id: string, record: Omit<SalesRecord, "id">) => void
  deleteSalesRecord: (id: string) => void
  exportToCSV: () => void

  // Admin settings management
  settings: AdminSettings
  updateSettings: (newSettings: AdminSettings) => void
  resetSettings: () => void

  // Authentication
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

// Default settings
const DEFAULT_SETTINGS: AdminSettings = {
  regions: ["East", "Central", "West"],
  items: [
    { name: "Television", defaultPrice: 1198 },
    { name: "Home Theater", defaultPrice: 499 },
    { name: "Smartphone", defaultPrice: 899 },
    { name: "Laptop", defaultPrice: 1299 },
    { name: "Tablet", defaultPrice: 599 },
    { name: "Headphones", defaultPrice: 249 },
    { name: "Speaker", defaultPrice: 179 },
    { name: "Camera", defaultPrice: 799 },
  ],
  managers: ["Martha", "Hermann", "Timothy", "Pat"],
  salespeople: ["Alexander", "Shelli", "Bruce", "David", "Nancy", "Daniel"],
  fieldVisibility: {
    orderDate: true,
    region: true,
    manager: true,
    salesMan: true,
    item: true,
    units: true,
    unitPrice: true,
    saleAmount: true,
  },
  customFields: [],
  auth: {
    username: "admin",
    password: "1234admin",
  },
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [salesData, setSalesData] = useState<SalesRecord[]>([])
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load data and settings from localStorage on component mount
  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const savedData = localStorage.getItem("salesData")
        if (savedData) {
          setSalesData(JSON.parse(savedData))
        }

        const savedSettings = localStorage.getItem("adminSettings")
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings))
        }
      } catch (error) {
        console.error("Failed to load data from localStorage:", error)
      }
    }

    loadFromLocalStorage()
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("salesData", JSON.stringify(salesData))
  }, [salesData])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("adminSettings", JSON.stringify(settings))
  }, [settings])

  // Sales data functions
  const addSalesRecord = (record: Omit<SalesRecord, "id">) => {
    const newRecord = {
      ...record,
      id: crypto.randomUUID(),
    }
    setSalesData((prev) => [newRecord, ...prev])
  }

  const deleteSalesRecord = (id: string) => {
    setSalesData((prev) => prev.filter((record) => record.id !== id))
  }

  const exportToCSV = () => {
    if (salesData.length === 0) return

    // Create standard headers
    const standardHeaders = ["OrderDate", "Region", "Manager", "SalesMan", "Item", "Units", "Unit_price", "Sale_amt"]

    // Add custom field headers
    const customFieldHeaders = settings.customFields.map((field) => field.name)
    const allHeaders = [...standardHeaders, ...customFieldHeaders]

    // Create CSV rows with standard and custom fields
    const rows = salesData.map((record) => {
      // Standard fields
      const standardFields = [
        record.orderDate,
        record.region,
        record.manager,
        record.salesMan,
        record.item,
        record.units,
        record.unitPrice,
        record.saleAmount,
      ]

      // Custom fields
      const customFields = settings.customFields.map((field) => {
        const value = record.customFieldValues?.[field.id] ?? ""
        return value
      })

      return [...standardFields, ...customFields]
    })

    // Combine header and rows
    const csvContent = [allHeaders.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `sales_data_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Admin settings functions
  const updateSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings)
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  // Add the updateSalesRecord function to the AppProvider component
  const updateSalesRecord = (id: string, record: Omit<SalesRecord, "id">) => {
    setSalesData((prev) => prev.map((item) => (item.id === id ? { ...record, id } : item)))
  }

  // Authentication functions
  const login = (username: string, password: string): boolean => {
    if (username === settings.auth.username && password === settings.auth.password) {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  // Update the return value of the AppProvider to include updateSalesRecord
  return (
    <AppContext.Provider
      value={{
        salesData,
        addSalesRecord,
        updateSalesRecord,
        deleteSalesRecord,
        exportToCSV,
        settings,
        updateSettings,
        resetSettings,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

