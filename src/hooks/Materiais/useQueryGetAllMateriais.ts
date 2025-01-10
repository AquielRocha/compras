import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface Materiais {
  id: number;
  codigo_item: number;
  nome_item: string;
  descricao_item: string;
  codigo_grupo: number;
  nome_grupo: string;
  nome_classe: string;
  data_hora_atualizacao?: string; // Campo de Materiais
  codigo_do_grupo?: string;      // Campo de LsMateriais
  nome_do_grupo?: string;        // Campo de LsMateriais
  codigo_da_classe?: string;     // Campo de LsMateriais
  nome_da_classe?: string;       // Campo de LsMateriais
  codigo_do_pdm?: string;        // Campo de LsMateriais
  nome_do_pdm?: string;          // Campo de LsMateriais
}

async function getAllLsMateriais() {
  try {
    const response = await api.get(`/LsMateriais/getAll`);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar LsMateriais:", error);
    return [];
  }
}

async function getAllMateriais() {
  try {
    const response = await api.get(`/Materiais/getAll`);
    return response.data || [];
  } catch (error) {
    console.error("Erro ao buscar Materiais:", error);
    return [];
  }
}


export function useQueryGetAllLsMateriais() {
  return useQuery({
    queryKey: ["LsMateriais"],
    queryFn: getAllLsMateriais,
  });
}

export function useQueryGetAllMateriais() {
  return useQuery({
    queryKey: ["Materiais"],
    queryFn: getAllMateriais,
  });
}
