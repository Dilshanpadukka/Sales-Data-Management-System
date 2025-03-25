"use client"

import { useState } from "react"
import { useAppContext, type SalesRecord } from "./app-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Trash2, Edit } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { EditSalesRecordDialog } from "./edit-sales-record-dialog"

export function SalesDataDisplay() {
  const { salesData, deleteSalesRecord, settings } = useAppContext()
  const [recordToEdit, setRecordToEdit] = useState<SalesRecord | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  if (salesData.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No sales data has been submitted yet. Fill out the form above to add your first record.
        </AlertDescription>
      </Alert>
    )
  }

  const handleEditClick = (record: SalesRecord) => {
    setRecordToEdit(record)
    setIsEditDialogOpen(true)
  }

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false)
    setRecordToEdit(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {salesData.map((record) => (
          <Card key={record.id} className="overflow-hidden">
            <div className="bg-primary h-2"></div>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{record.item}</h3>
                  <p className="text-sm text-muted-foreground">{record.orderDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{record.region}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary"
                    onClick={() => handleEditClick(record)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive/90"
                    onClick={() => deleteSalesRecord(record.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                {settings.fieldVisibility.manager && (
                  <>
                    <div className="text-muted-foreground">Manager:</div>
                    <div>{record.manager}</div>
                  </>
                )}

                {settings.fieldVisibility.salesMan && (
                  <>
                    <div className="text-muted-foreground">Salesman:</div>
                    <div>{record.salesMan}</div>
                  </>
                )}

                {settings.fieldVisibility.units && (
                  <>
                    <div className="text-muted-foreground">Units:</div>
                    <div>{record.units}</div>
                  </>
                )}

                {settings.fieldVisibility.unitPrice && (
                  <>
                    <div className="text-muted-foreground">Unit Price:</div>
                    <div>${record.unitPrice.toFixed(2)}</div>
                  </>
                )}

                {settings.fieldVisibility.saleAmount && (
                  <>
                    <div className="text-muted-foreground font-medium">Sale Amount:</div>
                    <div className="font-medium">${record.saleAmount.toFixed(2)}</div>
                  </>
                )}

                {/* Display custom field values if they exist */}
                {record.customFieldValues &&
                  settings.customFields.map(
                    (field) =>
                      record.customFieldValues?.[field.id] && (
                        <>
                          <div className="text-muted-foreground">{field.name}:</div>
                          <div>{record.customFieldValues[field.id]}</div>
                        </>
                      ),
                  )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recordToEdit && (
        <EditSalesRecordDialog record={recordToEdit} isOpen={isEditDialogOpen} onClose={handleEditDialogClose} />
      )}
    </>
  )
}

