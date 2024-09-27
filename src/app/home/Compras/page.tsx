"use client"; 

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";
import { BarChart3 } from "lucide-react"; // Removed unused imports (FileText, Settings)
import { useQueryGetOrgaoById } from "@/hooks/Compras/useQueryGetById";
import { useQueryGetMateriaisById } from "@/hooks/Materiais/UseQueryGetById";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import { useQueryGetPrecoById } from "@/hooks/Materiais/Preco/useQueryGetPreco";
import PriceModal from "@/components/PrecoModal/PriceModal";

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
  codigoGrupo: number;
  nomeGrupo: string;
  codigoClasse: number;
  nomeClasse: string;
  codigoPdm: number;
  nomePdm: string;
  codigoItem: number;
  descricaoItem: string;
  statusItem: boolean;
  itemSustentavel: boolean;
  dataHoraAtualizacao: string;
}

export default function Compras() {
  const [orgaoId, setOrgaoId] = useState<string>("");
  const [materialId, setMaterialId] = useState<string>("");
  const [selectedUasg, setSelectedUasg] = useState<UASG | null>(null);
  const [mediaPreco, setMediaPreco] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { toast } = useToast();

  const {
    data: orgaoData,
    isLoading: isOrgaoLoading,
    error: orgaoError,
  } = useQueryGetOrgaoById(orgaoId);

  const {
    data: materiaisData,
    isLoading: isMateriaisLoading,
    error: materiaisError,
  } = useQueryGetMateriaisById(materialId);

  const {
    data: precoData,
    isLoading: isPrecoLoading,
    error: precoError,
  } = useQueryGetPrecoById(materialId);

  const [arrayDePrecos, setArrayDePrecos] = useState<number[]>([]); // Novo estado para armazenar preços

  useEffect(() => {
    if (precoData && Array.isArray(precoData)) {
      const precos = precoData.map((item: any) => item.precoUnitario); // Extrai os preços
      setArrayDePrecos(precos);
      const media = calcularMediaPreco(precos);
      setMediaPreco(media);
    }
  }, [precoData]);

  const calcularMediaPreco = (precos: number[]) => {
    const totalPreco = precos.reduce((acc: number, item: number) => acc + item, 0);
    return precos.length ? totalPreco / precos.length : null; // Evita divisão por zero
  };

  const handleConsultarPreco = () => {
    if (mediaPreco !== null) {
      setIsModalOpen(true);
    } else {
      toast({
        title: "Aviso",
        description: "Média de preço ainda não calculada Aguarde!!.",
        variant: "destructive", // Choose an appropriate variant for the toast
      });
    }
  };

  const renderMaterial = (material: Material) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          <span
            title={material.descricaoItem}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Material: {material.descricaoItem}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>CATMAT:</strong> {material.codigoItem}</p>
        <p><strong>Nome do Grupo:</strong> {material.nomeGrupo}</p>
        <p><strong>Código da Classe:</strong> {material.codigoClasse}</p>
        <p><strong>Nome do PDM:</strong> {material.nomePdm}</p>
        <p><strong>Status:</strong> {material.statusItem ? "Ativo" : "Inativo"}</p>
        <p><strong>Sustentável:</strong> {material.itemSustentavel ? "Sim" : "Não"}</p>
        <p>
          <strong>Data de Atualização deste material:</strong> {new Date(material.dataHoraAtualizacao).toLocaleString()}
        </p>

        <Button className="mt-4 bg-[var(--icmbio-green)] text-white hover:bg-green-700" onClick={handleConsultarPreco}>
          Consultar Preço
        </Button>
      </CardContent>
    </Card>
  );

  const renderOrgao = (orgao: Orgao) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Órgão: {orgao.orgao.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Código:</strong> {orgao.orgao.codigo}</p>
        <p><strong>Tipo Administração:</strong> {orgao.orgao.codigoTipoAdm}</p>
        <p><strong>Tipo Esfera:</strong> {orgao.orgao.codigoTipoEsfera}</p>
        <p><strong>Ativo:</strong> {orgao.orgao.ativo ? "Sim" : "Não"}</p>

        <h3 className="text-xl font-semibold mt-4">
          Unidades Administrativas de Serviços Gerais (UASGs):
        </h3>
        <Select
          onValueChange={(value) => {
            const selected = orgao.uasgs.find((uasg) => uasg.id === value);
            setSelectedUasg(selected || null);
          }}
        >
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
  );

  return (
    <div className="flex flex-col min-h-screen bg-background"  style={{'--icmbio-green': '#00823B'} as React.CSSProperties}>
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Relação de Bens - Compras
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Consulte todos os seus itens e aquisições de forma eficiente e
            transparente.
          </p>
        </section>
        
        <PriceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          prices={arrayDePrecos} // Passando o array de preços
        />

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
              <p className="text-destructive text-center py-4">
                Erro ao carregar os dados.
              </p>
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
                <BarChart3 className="h-8 w-8 mr-3 text-primary" />
                Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Acesse e gere relatórios detalhados sobre suas compras.
              </p>
            </CardContent>
            <CardFooter>
            <Button type="submit" className="bg-[var(--icmbio-green)] text-white hover:bg-green-700">
            Gerar Relatório
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
}
