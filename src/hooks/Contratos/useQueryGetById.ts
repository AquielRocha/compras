import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

async function getContratosByUasg(uasgId: number) {
  try {
    const response = await api.get(`Materiais/getByUasg/${uasgId}`);
    if (response.data) {
      console.log("Resposta da API:", response.data);
      return response.data;
    } else {
      console.error("Dados não encontrados");
      return null; 
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null; 
  }
}

export function useQueryGetContratosByUasg(uasgId: number) {
  return useQuery({
    queryKey: ["Contratos", uasgId], 
    queryFn: () => getContratosByUasg(uasgId), 
    enabled: !!uasgId, 
  });
}
