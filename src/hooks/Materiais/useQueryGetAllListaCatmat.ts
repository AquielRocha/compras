import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface LsMateriais {
  id: number;
  codigo_do_grupo: string;
  nome_do_grupo: string;
  codigo_da_classe: string;
  nome_da_classe: string;
  codigo_do_pdm: string;
  nome_do_pdm: string;
  codigo_do_item: string;
  descricao_do_item: string;
  codigo_ncm: string;
}

// Função para buscar LsMateriais no backend
async function getAllLsMateriais() {
  try {
    const response = await api.get<LsMateriais[]>(`/LsMateriais/getAll`);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar LsMateriais:", error);
    return [];
  }
}

// Hook para usar a query
export function useQueryGetAllLsMateriais() {
  return useQuery<LsMateriais[]>({
    queryKey: ["LsMateriais"],
    queryFn: getAllLsMateriais,
  });
}
