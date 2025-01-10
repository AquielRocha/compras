"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, Search } from 'lucide-react';
import { useQueryGetAllLsMateriais, useQueryGetAllMateriais } from "@/hooks/Materiais/useQueryGetAllMateriais";
import { DataTable } from "./DataTableMt";
import { Checkbox } from "@/components/ui/checkbox";

interface Materiais {
  codigo_item: number;
  nome_item: string;
  codigo_grupo: number;
  descricao_item: string;
}
export default function MateriaisTab() {
  const [showMateriais, setShowMateriais] = useState(false);

  // Fetching data
  const { data: lsMateriaisData, isLoading: isLoadingLs, error: errorLs } = useQueryGetAllLsMateriais();
  const { data: materiaisData, isLoading: isLoadingMateriais, error: errorMateriais } = useQueryGetAllMateriais();

  // Escolher os dados a serem exibidos
  const dataToDisplay = showMateriais ? materiaisData : lsMateriaisData;

  const isLoading = showMateriais ? isLoadingMateriais : isLoadingLs;
  const error = showMateriais ? errorMateriais : errorLs;

  return (
    <div className="w-full p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="toggleData"
            checked={showMateriais}
            onCheckedChange={(checked) => setShowMateriais(checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="toggleData" className="text-sm font-medium">
            Apenas Materiais Já Obtidos pelo ICMBio
            </Label>
            <p className="text-xs text-muted-foreground">
            Filtra apenas os materiais que já foram adquiridos.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        ) : error ? (
          <p className="text-destructive text-center py-4">Erro ao carregar os dados.</p>
        ) : (
          <div>
            {dataToDisplay && dataToDisplay.length > 0 ? (
              //@ts-ignore
              <DataTable data={dataToDisplay} />
            ) : (
              <p className="text-center py-4">Nenhum material encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
