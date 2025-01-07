"use client";

import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { ChevronLeft, ChevronRight, FileText, DollarSign } from "lucide-react";
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
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const groupedData = useMemo(() => {
    return data.reduce((acc, item) => {
      const description = item.descricao || "Sem Descrição";
      if (!acc[description]) {
        acc[description] = [];
      }
      acc[description].push(item);
      return acc;
    }, {} as Record<string, Servicos[]>);
  }, [data]);

  const sortedDescriptions = useMemo(() => {
    return Object.keys(groupedData).sort((a, b) => {
      if (a === "Sem Descrição") return 1;
      if (b === "Sem Descrição") return -1;
      return a.localeCompare(b);
    });
  }, [groupedData]);

  const totalPages = Math.ceil(sortedDescriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDescriptions = sortedDescriptions.slice(startIndex, endIndex);

  const handlePdfClick = () => {
    toast.info("Funcionalidade em desenvolvimento", {
      description: "A visualização de PDF estará disponível em breve.",
      duration: 3000,
      closeButton: true,
    });
  };

  return (
    <div className="w-full p-6 space-y-4">
      <Accordion type="single" collapsible>
        {currentDescriptions.map((description) => (
          <AccordionItem key={description} value={description}>
            <AccordionTrigger className="bg-gray-50 px-4 py-2 text-gray-700 hover:bg-gray-100">
              {description}
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] font-semibold text-gray-600">
                      CATSER
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
                  {groupedData[description].map((item) => (
                    <TableRow key={item.codigo} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-700">
                        {item.codigo}
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
                                      <strong>Código:</strong>{" "}
                                      <span>{item.codigo}</span>
                                      <strong>Descrição:</strong>{" "}
                                      <span>{item.descricao}</span>
                                      <strong>Grupo:</strong>{" "}
                                      <span>{item.codigo_grupo}</span>
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-between text-sm text-gray-600">
        <p>
          Exibindo {startIndex + 1} a {Math.min(endIndex, sortedDescriptions.length)} de{" "}
          {sortedDescriptions.length} Serviços
        </p>
        <div className="flex space-x-2">
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
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
