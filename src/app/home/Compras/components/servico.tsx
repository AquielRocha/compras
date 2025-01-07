"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryGetAllServicos } from "@/hooks/Servicos/useQueryGetAllServicos";
import { DataTable } from "./DataTableSv";

interface Servicos {
  codigo: number;
  descricao: string;
  codigo_grupo: number;
}

export default function ServicosTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServicos, setFilteredServicos] = useState<Servicos[]>([]);
  const [progress, setProgress] = useState(0);
  const [onlyObtained, setOnlyObtained] = useState(false);

  const { data: servicosData, isLoading, error } = useQueryGetAllServicos();

  useEffect(() => {
    if (servicosData) {
      const normalizeString = (str: string) =>
        str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Remove acentuações
          .toLowerCase();

      const termoBuscaNormalizado = normalizeString(searchTerm);

      const filtered = servicosData.filter((servico: Servicos) => {
        const descricaoNormalizada = normalizeString(servico.descricao);
        return (
          servico.codigo.toString().includes(searchTerm) ||
          descricaoNormalizada.includes(termoBuscaNormalizado)
        ) && (!onlyObtained || servico.codigo_grupo !== 0);
      });

      setFilteredServicos(filtered);
    }
  }, [servicosData, searchTerm, onlyObtained]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => Math.min(oldProgress + 10, 90));
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
            <Label htmlFor="search" className="mb-2 block">Buscar Serviço</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome ou código do serviço"
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
                Apenas Serviços Já Contratados pelo ICMBio
              </Label>
              <p className="text-xs text-muted-foreground">
                Filtra apenas os serviços que já foram adquiridos.
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
            {filteredServicos.length > 0 ? (
              //@ts-ignore
              <DataTable data={filteredServicos} />
            ) : (
              <p className="text-center py-4">Nenhum serviço encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
