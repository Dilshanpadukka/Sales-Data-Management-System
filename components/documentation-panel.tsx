"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DocumentationPanel() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Excel Documentation</h2>

      <Tabs defaultValue="columns">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="columns">Column Definitions</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
        </TabsList>

        <TabsContent value="columns" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Column Definitions</CardTitle>
              <CardDescription>Detailed explanation of each column in the sales data spreadsheet</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column Name</TableHead>
                    <TableHead>Definition</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">OrderDate</TableCell>
                    <TableCell>
                      The date of the sales transaction (e.g., 2018-01-06), indicating when the sale occurred.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Region</TableCell>
                    <TableCell>
                      The sales region (East, Central, West), showing the geographic area of the sale.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Manager</TableCell>
                    <TableCell>
                      The manager overseeing the sale (e.g., Martha, Hermann), identifying the team lead.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SalesMan</TableCell>
                    <TableCell>
                      The salesperson who made the sale (e.g., Alexander, Shelli), identifying the individual
                      contributor.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Item</TableCell>
                    <TableCell>The product sold (e.g., Television, Home Theater), specifying the item type.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Units</TableCell>
                    <TableCell>The quantity of items sold, a numeric value (e.g., 95).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Unit_price</TableCell>
                    <TableCell>The price per unit of the item, in dollars (e.g., 1198.0).</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sale_amt</TableCell>
                    <TableCell>
                      The total revenue from the sale, calculated as Units * Unit_price (e.g., 113810.0).
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formulas" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Formulas and Calculations</CardTitle>
              <CardDescription>Explanation of formulas used in the spreadsheet</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Formula</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      =F2*G2
                      <div className="text-xs text-muted-foreground mt-1">
                        (assuming Units is in column F and Unit_price is in G)
                      </div>
                    </TableCell>
                    <TableCell>
                      <p>
                        Multiplies the number of units by the unit price to compute the total sale amount, providing the
                        revenue for each transaction.
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">Example: 95 units × $1,198.00 = $113,810.00</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold">Implementation Notes</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Excel Updates:</strong> Direct Excel file updates require a backend (e.g., Node.js with
                    xlsx). This solution uses localStorage and CSV export.
                  </li>
                  <li>
                    <strong>Admin Panel:</strong> Allows editing of regions, managers, salespeople, and items/prices,
                    with changes persisting in localStorage.
                  </li>
                  <li>
                    <strong>User-Friendly:</strong> The frontend uses a Google Forms-like design with cards instead of
                    tables, enhanced with an admin interface.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

