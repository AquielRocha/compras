import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface Materiais {
  codigo: number;
  codigo_item: number;
  nome_item: string;
  
}

// Função para buscar todos os materiais
async function getAllMateriais() {
  try {
    const response = await api.get(`/Materiais/getAll`); // Chamando o endpoint de "getAll"
    
    if (response.data) {
      console.log("Resposta da API:", response.data);
      return response.data; // Retornando todos os materiais
    } else {
      console.error("Nenhum dado de materiais encontrado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar materiais:", error);
    return [];
  }
}

// Hook para fazer a query de todos os materiais
export function useQueryGetAllMateriais() {
  return useQuery({
    queryKey: ["Materiais"],
    queryFn: getAllMateriais, // Faz a query de todos os materiais
  });
}
