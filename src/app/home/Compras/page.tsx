"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import MateriaisTab from "./components/material"
import ServicosTab from "./components/servico"

export default function Component() {
  const [activeTab, setActiveTab] = useState("materiais")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto px-4 py-8">
 
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-600 p-6 rounded-t-lg">
            <CardTitle className="text-2xl font-semibold text-white text-center">
              Relação de Materiais e Serviços
            </CardTitle>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
  <TabsList className="grid w-full grid-cols-2 bg-white">
    <TabsTrigger
      value="materiais"
      className={`py-4 px-6 text-center text-sm font-medium transition-colors duration-300 ease-in-out
        ${activeTab === 'materiais' 
          ? 'text-green-600 bg-white shadow-md border-b-2 border-green-600' 
          : 'text-gray-700 hover:text-green-500 hover:bg-gray-50'}
      `}
    >
      Materiais
    </TabsTrigger>
    <TabsTrigger
      value="servicos"
      className={`py-4 px-6 text-center text-sm font-medium transition-colors duration-300 ease-in-out
        ${activeTab === 'servicos' 
          ? 'text-green-600 bg-white shadow-md border-b-2 border-green-600' 
          : 'text-gray-700 hover:text-green-500 hover:bg-gray-50'}
      `}
    >
      Serviços
    </TabsTrigger>
  </TabsList>
  <TabsContent 
    value="materiais" 
    className="p-6 bg-white rounded-b-lg transition-all duration-300 ease-in-out"
  >
    <MateriaisTab />
  </TabsContent>
  <TabsContent 
    value="servicos" 
    className="p-6 bg-white rounded-b-lg transition-all duration-300 ease-in-out"
  >
    <ServicosTab />
  </TabsContent>
</Tabs>

        </Card>
      </main>
    </div>
  )
}
