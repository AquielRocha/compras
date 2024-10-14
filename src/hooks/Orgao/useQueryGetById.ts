import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";


interface Orgao {
  codigo: number;
}


async function getOrgaoById(codigo: any) {
  try {
    const response = await api.get(`/Orgao/getById${codigo}`);
    
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

export function useQueryGetOrgaoById(codigo: any) {
  return useQuery({
    queryKey: ["Orgao", codigo], 
    queryFn: () => getOrgaoById(codigo), 
    enabled: !!codigo, 
  });
}


