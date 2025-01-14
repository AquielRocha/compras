import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface Materiais {
  id: number;
  codigo_item: number;
  nome_item: string; // Equivale ao nome do pdm
  descricao_item: string;
  codigo_grupo: number;
  nome_grupo: string;
  nome_classe: string;
  data_hora_atualizacao: string;
}

// Função para buscar os materiais do ICMBio
async function getAllMateriaisICMBio() {
  try {
    const response = await api.get<Materiais[]>("/materiais/GetAll");
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar materiais ICMBio:", error);
    return [];
  }
}

// Hook para React Query
export function useQueryGetAllMateriaisICMBio() {
  return useQuery<Materiais[]>({
    queryKey: ["MateriaisICMBio"],
    queryFn: getAllMateriaisICMBio,
  });
}
