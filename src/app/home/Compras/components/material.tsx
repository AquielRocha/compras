"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, Search } from 'lucide-react';
import { useQueryGetAllMateriais } from "@/hooks/Materiais/useQueryGetAllMateriais";
import { DataTable } from "./DataTableMt";
import { Checkbox } from "@/components/ui/checkbox";

interface Materiais {
  codigo_item: number;
  nome_item: string;
  codigo_grupo: number;
  descricao_item: string;
}

export default function MateriaisTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMateriais, setFilteredMateriais] = useState<Materiais[]>([]);
  const [progress, setProgress] = useState(0);
  const [onlyObtained, setOnlyObtained] = useState(false);

  const { data: materiaisData, isLoading, error } = useQueryGetAllMateriais();

  useEffect(() => {
    if (materiaisData) {
      const normalizeString = (str: string) =>
        str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Remove acentuações
          .toLowerCase();

      const termoBuscaNormalizado = normalizeString(searchTerm);

      const filtered = materiaisData.filter((material: Materiais) => {
        const nomeNormalizado = normalizeString(material.nome_item);
        return (
          material.codigo_item.toString().includes(searchTerm) ||
          nomeNormalizado.includes(termoBuscaNormalizado)
        ) && (!onlyObtained || material.codigo_grupo !== 0);
      });

      setFilteredMateriais(filtered);
    }
  }, [materiaisData, searchTerm, onlyObtained]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 10, 90);
          return newProgress;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timer = setTimeout(() => setProgress(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="w-full p-6">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search" className="mb-2 block">Buscar Material</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome ou código do material"
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="onlyObtained"
              checked={onlyObtained}
              onCheckedChange={(checked) => setOnlyObtained(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="onlyObtained"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Apenas Materiais Já Obtidos pelo ICMBio
              </Label>
              <p className="text-xs text-muted-foreground">
                Filtra apenas os materiais que já foram adquiridos.
              </p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">Carregando... {progress}%</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        ) : error ? (
          <p className="text-destructive text-center py-4">Erro ao carregar os dados.</p>
        ) : (
          <div>
            {filteredMateriais.length > 0 ? (
              //@ts-ignore
              <DataTable data={filteredMateriais} />
            ) : (
              <p className="text-center py-4">Nenhum material encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
