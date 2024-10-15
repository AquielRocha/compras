"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import { useQueryGetAllMateriais } from "@/hooks/Materiais/useQueryGetAllMateriais"
import { DataTable } from "./DataTableMt"

interface Materiais {
  codigo_item: number;
  nome_item: string;
  codigo_grupo: number;
  descricao_item: string;
}

export default function MateriaisTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMateriais, setFilteredMateriais] = useState<Materiais[]>([])
  const [progress, setProgress] = useState(0)

  const { data: materiaisData, isLoading, error } = useQueryGetAllMateriais()

  useEffect(() => {
    if (materiaisData) {
      const filtered = materiaisData.filter((material: Materiais) =>
        material.codigo_item.toString().includes(searchTerm) ||
        material.nome_item.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredMateriais(filtered)
    }
  }, [materiaisData, searchTerm])

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 10, 90)
          return newProgress
        })
      }, 500)

      return () => clearInterval(interval)
    } else {
      setProgress(100)
      const timer = setTimeout(() => setProgress(0), 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <CardContent>
      <div className="grid w-full items-center gap-4 mb-6">
        <div className="flex items-center gap-1.5">
          <Label htmlFor="search">Buscar Material</Label>
          <Input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome ou código do material"
          />
        </div>
      </div>

      {isLoading && (
        <div className="mb-4">
          <Progress value={progress} className="w-full" />
          <p className="text-center mt-2 text-sm text-muted-foreground">Carregando... {progress}%</p>
        </div>
      )}
      {isLoading ? (
        <div className="text-center py-4">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto" />
        </div>
      ) : error ? (
        <p className="text-destructive text-center py-4">Erro ao carregar os dados.</p>
      ) : (
        <div>
          {filteredMateriais.length > 0 ? (
            <DataTable data={filteredMateriais} />
          ) : (
            <p className="text-center">Nenhum material encontrado.</p>
          )}
        </div>
      )}
    </CardContent>
  )
}