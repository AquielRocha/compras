"use client"

import { useEffect, useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useQueryGetAllServicos } from "@/hooks/Servicos/useQueryGetAllServicos"
import { DataTable } from "./DataTableSv"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"




interface Servicos {
    codigo: number;
    descricao: string;
    codigo_grupo: number;
}



export default function ServicosTab() {
  const [searchTerm, setSearchTerm] = useState("")
    const [filteredServicos, setFilteredServicos] = useState<Servicos[]>([])
    const [progress, setProgress] = useState(0)

    const {data : servicosData, isLoading, error} = useQueryGetAllServicos()

    useEffect(() => {
        if(servicosData){
            const filtered = servicosData.filter((servico: Servicos) =>
                servico.codigo.toString().includes(searchTerm) ||
                servico.descricao.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredServicos(filtered)
    }
}, [servicosData, searchTerm])

useEffect(() => {
    if (isLoading) {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                const newProgress = Math.min(oldProgress + 10, 90)
                return newProgress
            })
        },500)
        return() => clearInterval(interval)
    } else{
        setProgress(100)
        const timer = setTimeout(() => setProgress(0), 1000)
        return () => clearTimeout(timer)
      }
    }, [isLoading])
  
  return (
    <CardContent>
      <div className="grid w-full items-center gap-4 mb-6">
        <div className="flex items-center gap-1.5">
          <Label htmlFor="search-service">Buscar Serviço</Label>
          <Input
            type="text"
            id="search-service"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome ou código do serviço"
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
            {filteredServicos.length > 0 ? (
                <DataTable data={filteredServicos} />
            ) : (
                <p className="text-center"> Nenhum Serviço encontrado</p>
            )}
        </div>
      )}
      
    </CardContent>
  )
}