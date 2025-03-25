"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

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
}

type SalesDataContextType = {
  salesData: SalesRecord[]
  addSalesRecord: (record: Omit<SalesRecord, "id">) => void
  exportToCSV: () => void
}

const SalesDataContext = createContext<SalesDataContextType | undefined>(undefined)

export function SalesDataProvider({ children }: { children: React.ReactNode }) {
  const [salesData, setSalesData] = useState<SalesRecord[]>([])

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("salesData")
    if (savedData) {
      try {
        setSalesData(JSON.parse(savedData))
      } catch (error) {
        console.error("Failed to parse saved sales data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("salesData", JSON.stringify(salesData))
  }, [salesData])

  const addSalesRecord = (record: Omit<SalesRecord, "id">) => {
    const newRecord = {
      ...record,
      id: crypto.randomUUID(),
    }
    setSalesData((prev) => [newRecord, ...prev])
  }

  const exportToCSV = () => {
    if (salesData.length === 0) return

    // Create CSV header
    const headers = ["OrderDate", "Region", "Manager", "SalesMan", "Item", "Units", "Unit_price", "Sale_amt"]

    // Create CSV rows
    const rows = salesData.map((record) => [
      record.orderDate,
      record.region,
      record.manager,
      record.salesMan,
      record.item,
      record.units,
      record.unitPrice,
      record.saleAmount,
    ])

    // Combine header and rows
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

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

  return (
    <SalesDataContext.Provider value={{ salesData, addSalesRecord, exportToCSV }}>{children}</SalesDataContext.Provider>
  )
}

export function useSalesData() {
  const context = useContext(SalesDataContext)
  if (context === undefined) {
    throw new Error("useSalesData must be used within a SalesDataProvider")
  }
  return context
}

