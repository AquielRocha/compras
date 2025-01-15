"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryGetAllLsMateriais } from "@/hooks/Materiais/useQueryGetAllListaCatmat";
import { useQueryGetAllMateriaisICMBio } from "@/hooks/Materiais/useQueryGetAllMateriaisIcmbio";
import { DataTable } from "./DataTableMt";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
  const [activeTab, setActiveTab] = useState("icmbio");
  const [pesquisa, setPesquisa] = useState("");
  const [carrinho, setCarrinho] = useState<GenericMaterial[]>([]);

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

  const viewTabela = (): GenericMaterial[] => {
    switch (activeTab) {
      case "icmbio":
        return genericMateriaisICMBio || [];
      default:
        return genericLsMateriais || [];
    }
  };

  const filtroData = viewTabela().filter((item) => {
    const searchIn = `${item.groupName} ${item.className} ${item.pdmName} ${item.itemDescription} ${item.itemCode}`;
    return searchIn.toLowerCase().includes(pesquisa.toLowerCase());
  });

  const isLoading = isLoadingLs || isLoadingICMBio;
  const error = errorLs || errorICMBio;

  const addCarrinho = (item: GenericMaterial) => {
    setCarrinho((prev) => [...prev, item]);
  };

  return (
      <><CardHeader className="flex flex-row items-center justify-between">
      <div className="relative">
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Carrinho de compras</span>
        </Button>
        {carrinho.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {carrinho.length}
          </span>
        )}
      </div>
    </CardHeader><CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Pesquisar materiais..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="w-full" />
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="icmbio">ICMBio</TabsTrigger>
              <TabsTrigger value="ls">Itens em Geral</TabsTrigger>
            </TabsList>
            <TabsContent value="ls">
              <MaterialsContent
                isLoading={isLoading}
                error={error}
                filteredData={filtroData}
                addCarrinho={addCarrinho} />
            </TabsContent>
            <TabsContent value="icmbio">
              <MaterialsContent
                isLoading={isLoading}
                error={error}
                filteredData={filtroData}
                addCarrinho={addCarrinho} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent></>
  );
}

function MaterialsContent({
  isLoading,
  error,
  filteredData,
  addCarrinho,
}: {
  isLoading: boolean;
  error: any;
  filteredData: GenericMaterial[];
  addCarrinho: (item: GenericMaterial) => void;
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
        <DataTable data={filteredData} onAddToCart={addCarrinho} />
      ) : (
        <p className="text-center py-4">Nenhum material encontrado.</p>
      )}
    </div>
  );
}
