import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";


interface Materiais {
  codigo: number;
}


async function getMateriaisById(codigo: any) {
  try {
    const response = await api.get(`/Materiais/getById${codigo}`);
    
    if (response.data) {
      console.log("Resposta da API:", response.data);
      return response.data;
    } else {
      console.error("Dados do órgão não encontrados");
      return null; 
    }
  } catch (error) {
    console.error("Erro ao buscar órgão:", error);
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


