"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryGetAllLsMateriais } from "@/hooks/Materiais/useQueryGetAllListaCatmat";
import { useQueryGetAllMateriaisICMBio } from "@/hooks/Materiais/useQueryGetAllMateriaisIcmbio";
import { DataTable } from "./DataTableMt";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface GenericMaterial {
  id: number;
  groupName: string;
  className: string;
  pdmName: string;
  itemCode: string;
  itemDescription: string;
  extraInfo: string;
}

export default function MateriaisTab() {
  const [activeTab, setActiveTab] = useState("ls");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<GenericMaterial[]>([]);

  const {
    data: lsMateriaisData,
    isLoading: isLoadingLs,
    error: errorLs,
  } = useQueryGetAllLsMateriais();

  const {
    data: materiaisICMBioData,
    isLoading: isLoadingICMBio,
    error: errorICMBio,
  } = useQueryGetAllMateriaisICMBio();

  const genericLsMateriais = lsMateriaisData?.map((item) => ({
    id: item.id,
    groupName: item.nome_do_grupo,
    className: item.nome_da_classe,
    pdmName: item.nome_do_pdm,
    itemCode: item.codigo_do_item,
    itemDescription: item.descricao_do_item,
    extraInfo: item.codigo_ncm,
  }));

  const genericMateriaisICMBio = materiaisICMBioData?.map((item) => ({
    id: item.id,
    groupName: item.nome_grupo,
    className: item.nome_classe,
    pdmName: item.nome_item,
    itemCode: item.codigo_item.toString(),
    itemDescription: item.descricao_item,
    extraInfo: item.data_hora_atualizacao,
  }));

  const getDataToDisplay = (): GenericMaterial[] => {
    switch (activeTab) {
      case "icmbio":
        return genericMateriaisICMBio || [];
      default:
        return genericLsMateriais || [];
    }
  };

  const filteredData = getDataToDisplay().filter((item) => {
    const searchIn = `${item.groupName} ${item.className} ${item.pdmName} ${item.itemDescription} ${item.itemCode}`;
    return searchIn.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const isLoading = isLoadingLs || isLoadingICMBio;
  const error = errorLs || errorICMBio;

  const addToCart = (item: GenericMaterial) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <Card className="w-full p-6">
      <CardHeader>
         
          <div className="text-sm font-medium text-gray-600">
            Itens Adicionados: {cart.length}
          </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Pesquisar materiais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ls">Todos</TabsTrigger>
              <TabsTrigger value="icmbio">ICMBio</TabsTrigger>
            </TabsList>
            <TabsContent value="ls">
              <MaterialsContent
                isLoading={isLoading}
                error={error}
                filteredData={filteredData}
                onAddToCart={addToCart}
              />
            </TabsContent>
            <TabsContent value="icmbio">
              <MaterialsContent
                isLoading={isLoading}
                error={error}
                filteredData={filteredData}
                onAddToCart={addToCart}
              />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}

function MaterialsContent({
  isLoading,
  error,
  filteredData,
  onAddToCart,
}: {
  isLoading: boolean;
  error: any;
  filteredData: GenericMaterial[];
  onAddToCart: (item: GenericMaterial) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-destructive text-center py-4">
        Erro ao carregar os dados.
      </p>
    );
  }

  return (
    <div>
      {filteredData && filteredData.length > 0 ? (
        //@ts-ignore
        <DataTable data={filteredData} onAddToCart={onAddToCart} />
      ) : (
        <p className="text-center py-4">Nenhum material encontrado.</p>
      )}
    </div>
  );
}
