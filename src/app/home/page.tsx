"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NavBar from '@/components/NavBar'
import { BarChart3, FileText, Settings } from 'lucide-react'
import { useQueryGetOrgaoById } from '@/hooks/Compras/useQueryGetById'
import { useQueryGetMateriaisById } from '@/hooks/Materiais/UseQueryGetById'
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'

interface UASG {
  id: string;
  nome: string;
  idOrgaoSuperior: string;
  cep: string;
}

interface Orgao {
  orgao: {
    nome: string;
    codigo: string;
    codigoTipoAdm: string;
    codigoTipoEsfera: string;
    ativo: boolean;
  };
  uasgs: UASG[];
}

interface Material {
  material: any
  descricao: string;
  codigo: number;
  idGrupo: string;
  idClasse: string;
  idPdm: string;
  status: boolean;
  sustentavel: boolean;
}

export default function HomePage() {
  const [orgaoId, setOrgaoId] = useState<string>('')
  const [materialId, setMaterialId] = useState<string>('')
  const [selectedUasg, setSelectedUasg] = useState<UASG | null>(null)
  const { toast } = useToast() // Inicialize o hook useToast

  const { data: orgaoData, isLoading: isOrgaoLoading, error: orgaoError } = useQueryGetOrgaoById(orgaoId)
  const { data: materiaisData, isLoading: isMateriaisLoading, error: materiaisError } = useQueryGetMateriaisById(materialId)
  
  useEffect(() => {
    if (!isOrgaoLoading && !isMateriaisLoading) {
      toast({
        title: "Requisição concluída",
        description: "Os dados foram carregados com sucesso.",
        duration: 3000, 
        variant: "default", 
      })
    }
  }, [isOrgaoLoading, isMateriaisLoading, toast])
  
  
  const renderMaterial = (material: Material) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Material: {material.descricao}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Código:</strong> {material.codigo}</p>
        <p><strong>ID Grupo:</strong> {material.idGrupo}</p>
        <p><strong>ID Classe:</strong> {material.idClasse}</p>
        <p><strong>ID PDM:</strong> {material.idPdm}</p>
        <p><strong>Status:</strong> {material.status ? 'Ativo' : 'Inativo'}</p>
        <p><strong>Sustentável:</strong> {material.sustentavel ? 'Sim' : 'Não'}</p>
      </CardContent>
    </Card>
  )

  const renderOrgao = (orgao: Orgao) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Órgão: {orgao.orgao.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Código:</strong> {orgao.orgao.codigo}</p>
        <p><strong>Tipo Administração:</strong> {orgao.orgao.codigoTipoAdm}</p>
        <p><strong>Tipo Esfera:</strong> {orgao.orgao.codigoTipoEsfera}</p>
        <p><strong>Ativo:</strong> {orgao.orgao.ativo ? 'Sim' : 'Não'}</p>

        <h3 className="text-xl font-semibold mt-4">Unidades Administrativas de Serviços Gerais (UASGs):</h3>
        <Select onValueChange={(value) => {
          const selected = orgao.uasgs.find((uasg) => uasg.id === value);
          setSelectedUasg(selected || null);
        }}>
          <SelectTrigger className="w-full">
            <span>Selecione uma unidade</span>
          </SelectTrigger>
          <SelectContent>
            {orgao.uasgs.map((uasg) => (
              <SelectItem key={uasg.id} value={uasg.id}>
                {uasg.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedUasg && (
          <div className="mt-4">
            <p><strong>Nome:</strong> {selectedUasg.nome}</p>
            <p><strong>Código da Unidade:</strong> {selectedUasg.id}</p>
            <p><strong>Órgão Superior:</strong> {selectedUasg.idOrgaoSuperior}</p>
            <p><strong>CEP:</strong> {selectedUasg.cep}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">Consulta de Compras</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gerencie todas as suas compras e aquisições de forma eficiente e transparente.
          </p>
        </section>

        <Card className="mb-12">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="orgaoId">Código do Órgão</Label>
                <Input
                  type="text"
                  id="orgaoId"
                  value={orgaoId}
                  onChange={(e) => setOrgaoId(e.target.value)}
                  placeholder="Digite o código do órgão"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="materialId">Código(CATMAT) do Material</Label>
                <Input
                  type="text"
                  id="materialId"
                  value={materialId}
                  onChange={(e) => setMaterialId(e.target.value)}
                  placeholder="Digite o código do material"
                />
              </div>
            </div>
          </CardContent>
          <CardContent>
            {isOrgaoLoading || isMateriaisLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Carregando...</p>
              </div>
            ) : orgaoError || materiaisError ? (
              <p className="text-destructive text-center py-4">Erro ao carregar os dados.</p>
            ) : (
              <div>
                {orgaoData && renderOrgao(orgaoData)}
                {materiaisData && renderMaterial(materiaisData)}
              </div>
            )}
          </CardContent>
        </Card>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="h-8 w-8 mr-3 text-primary" />
                Processos em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Acompanhe e gerencie todos os processos ativos.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">Ver Processos</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <BarChart3 className="h-8 w-8 mr-3 text-primary" />
                Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Acesse e gere relatórios detalhados sobre suas compras.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">Gerar Relatórios</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Settings className="h-8 w-8 mr-3 text-primary" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Ajuste as configurações de sua conta e preferências.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">Configurar</Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  )
}
