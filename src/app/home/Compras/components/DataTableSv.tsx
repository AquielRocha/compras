"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  DollarSign,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import Modal from "./ModalPreco";

interface Servicos {
  codigo: number;
  descricao: string | null;
  codigo_grupo: number | null;
  cpc: number;
  codigo_secao: number;
  codigo_divisao: number;
  codigo_classe: number | null;
}

export const DataTable = ({ data }: { data: Servicos[] }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePdfClick = () => {
    toast.info("Funcionalidade em desenvolvimento", {
      description: "A visualização de PDF estará disponível em breve.",
      duration: 3000,
      closeButton: true,
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[100px] font-semibold text-gray-600">
                CATSER
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Descrição do Serviço
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Grupo
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-600">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.codigo} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-700">
                  {item.codigo}
                </TableCell>
                <TableCell className="text-gray-700">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger >
                        {item.descricao}
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="max-w-xs flex items-center">
                          <Info className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm">{item.descricao}</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-gray-700">
                  {item.codigo_grupo}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={handlePdfClick}
                          >
                            <FileText className="h-4 w-4 text-gray-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ver PDF</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Modal
                              trigger={
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <DollarSign className="h-4 w-4 text-gray-500" />
                                </Button>
                              }
                              title="Detalhes e Preço"
                              description="Serviço:"
                            >
                              <div className="space-y-2">
                                <div>
                                  <strong>Código: </strong>
                                  <span>{item.codigo}</span>
                                </div>
                                <div>
                                  <strong>Descrição: </strong>
                                  <span>{item.descricao}</span>
                                </div>
                                <div>
                                  <strong>Grupo: </strong>
                                  <span>{item.codigo_grupo}</span>
                                </div>
                                <div>
                                  <strong>CPC: </strong>
                                  <span>{item.cpc}</span>
                                </div>
                                <div>
                                  <strong>Seção: </strong>
                                  <span>{item.codigo_secao}</span>
                                </div>
                                <div>
                                  <strong>Divisão: </strong>
                                  <span>{item.codigo_divisao}</span>
                                </div>
                                <div>
                                  <strong>Classe: </strong>
                                  <span>{item.codigo_classe}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                  Informações retiradas do:{" "}
                                  <a
                                    href="https://compras.dados.gov.br/docs/home.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                  >
                                    Portal de Compras do Governo Federal
                                  </a>
                                </div>
                              </div>
                            </Modal>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ver Preço</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          Exibindo {startIndex + 1} a {Math.min(endIndex, data.length)} de{" "}
          {data.length} itens
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 px-2 text-gray-600"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="h-8 px-2 text-gray-600"
          >
            Próximo
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
