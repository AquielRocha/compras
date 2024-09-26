import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface Materiais {
  codigo: number;
  descricao: string;
  idGrupo: number;
  idClasse: number;
  idPdm: number;
  status: boolean;
  sustentavel: boolean;
}

async function getMateriaisById(codigo: any) {
  try {
    const response = await api.get(`/Materiais/getById/${codigo}`); // Corrigido para adicionar a barra antes do código

    if (response.data) {
      console.log("Resposta da API:", response.data);
      return response.data; // Ajustar para retornar a estrutura correta se necessário
    } else {
      console.error("Dados do material não encontrados");
      return null; 
    }
  } catch (error) {
    console.error("Erro ao buscar material:", error);
    return null; 
  }
}

export function useQueryGetMateriaisById(codigo: any) {
  return useQuery({
    queryKey: ["Materiais", codigo], 
    queryFn: () => getMateriaisById(codigo), 
    enabled: !!codigo, 
  });
}