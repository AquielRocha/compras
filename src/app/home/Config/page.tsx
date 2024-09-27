"use client";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Bell, Shield, User, Settings } from 'lucide-react'

export default function Component() {
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)

  return (
    <div className="min-h-screen bg-white text-green-900" style={{'--icmbio-green': '#00823B'} as React.CSSProperties}>
      <header className="bg-[var(--icmbio-green)] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8" />
            <span className="text-2xl font-bold">ICMBIO</span>
          </div>
          <nav>
            <Button variant="ghost" className="text-white hover:text-green-100">Logout</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto mt-8 flex">
        <aside className="w-64 pr-8">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start bg-green-100">
              <Settings className="mr-2 h-4 w-4" /> Ajustes
            </Button>
          
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" /> Notificação
            </Button>
     
          </nav>
        </aside>

        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Configurações</h1>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="bg-green-100">
              <TabsTrigger value="general">Central</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="privacy">Privacidade</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-6">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu Nome" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Seu email" />
                </div>
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <select id="language" className="w-full p-2 border border-green-300 rounded-md">
                    <option>Português</option>
                    <option>English</option>
                  </select>
                </div>
                <Button type="submit" className="bg-[var(--icmbio-green)] text-white hover:bg-green-700">
                  Salvar Mudanças
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="notifications" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Receber Notificações</h3>
                    <p className="text-sm text-green-600">Receba notificações push nos seus dispositivos.</p>
                  </div>
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                    className="bg-green-200 data-[state=checked]:bg-[var(--icmbio-green)]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Emails de Marketing</h3>
                    <p className="text-sm text-green-600">Receba emails sobre novos recursos e atualizações.</p>
                  </div>
                  <Switch 
                    checked={marketing} 
                    onCheckedChange={setMarketing}
                    className="bg-green-200 data-[state=checked]:bg-[var(--icmbio-green)]"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="privacy" className="mt-6">
              <p>O conteúdo das configurações de privacidade.</p>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}