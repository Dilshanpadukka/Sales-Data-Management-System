import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesForm } from "@/components/sales-form"
import { SalesDataDisplay } from "@/components/sales-data-display"
import { AdminPanel } from "@/components/admin-panel"
import { DocumentationPanel } from "@/components/documentation-panel"
import { AppProvider } from "@/components/app-provider"
import { AdminAuth } from "@/components/admin-auth"

export default function Home() {
  return (
    <AppProvider>
      <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sales Data Management System</h1>
            <p className="mt-2 text-lg text-gray-600">Enter, view, and manage your sales data</p>
          </div>

          <Tabs defaultValue="data-entry" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="data-entry">Data Entry</TabsTrigger>
              <TabsTrigger value="admin">Admin Panel</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="data-entry" className="mt-6">
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <SalesForm />
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Submitted Sales Data</h2>
                <SalesDataDisplay />
              </div>
            </TabsContent>

            <TabsContent value="admin" className="mt-6">
              <AdminAuth>
                <div className="bg-white shadow rounded-lg p-6">
                  <AdminPanel />
                </div>
              </AdminAuth>
            </TabsContent>

            <TabsContent value="documentation" className="mt-6">
              <div className="bg-white shadow rounded-lg p-6">
                <DocumentationPanel />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AppProvider>
  )
}

