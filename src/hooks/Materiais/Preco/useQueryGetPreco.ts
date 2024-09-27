import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";




async function getPrecoById(codigo: any) {
  try {
    const response = await api.get(`/Preco/getById/${codigo}`);
    
    if (response.data) {
      console.log("Response ss API:", response.data);
      return response.data;
    } else {
      console.error("Dados do preco do produto não encontrados");
      return null; 
    }
  } catch (error) {
    console.error("Erro ao buscar Preço do Produto:", error);
    return null; 
  }
}

export function useQueryGetPrecoById(codigo: any) {
  return useQuery({
    queryKey: ["Preco", codigo], 
    queryFn: () => getPrecoById(codigo), 
    enabled: !!codigo, 
  });
}


