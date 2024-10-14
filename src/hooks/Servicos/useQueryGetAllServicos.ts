import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface Servicos {
  codigo: number;
  descricao: string;
  codigo_grupo: number;
  
}

// Função para buscar todos os materiais
async function getAllServicos() {
  try {
    const response = await api.get(`/Servico/getAll`); // Chamando o endpoint de "getAll"
    
    if (response.data) {
      console.log("Resposta da API:", response.data);
      return response.data; // Retornando todos os materiais
    } else {
      console.error("Nenhum dado do serviço encontrado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar os Servicos:", error);
    return [];
  }
}

// Hook para fazer a query de todos os materiais
export function useQueryGetAllServicos() {
  return useQuery({
    queryKey: ["Servicos"],
    queryFn: getAllServicos, // Faz a query de todos os materiais
  });
}
