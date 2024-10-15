"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight, FileText, DollarSign, Info } from "lucide-react"
import { toast } from "sonner"

interface Materiais {
  codigo_item: number
  nome_item: string
  codigo_grupo: number
  descricao_item: string
}

export const DataTable = ({ data }: { data: Materiais[] }) => {

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)





  const handlePdfClick = () => {
    toast.info("Funcionalidade em desenvolvimento", {
      description: "A visualização de PDF estará disponível em breve.",
      duration: 3000,
      closeButton: true,
    });
  };
  const handleBuy = () => {
    toast.info("Funcionalidade em desenvolvimento", {
      description: "A visualização de PDF estará disponível em breve.",
      duration: 3000,
      closeButton: true,
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-semibold text-gray-600">CATMAT</TableHead>
              <TableHead className="font-semibold text-gray-600">Nome do Item</TableHead>
              <TableHead  className="font-semibold text-gray-600">Código do Grupo</TableHead>
              <TableHead className="text-right font-semibold text-gray-600">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.codigo_item}>
                <TableCell className="font-medium">{item.codigo_item}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-help underline decoration-dotted">
                        {item.nome_item}
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="max-w-xs">
                          <Info className="inline-block mr-2" size={16} />
                          <span>{item.descricao_item}</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{item.codigo_grupo}</TableCell>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={handleBuy}

                          >
                            <DollarSign className="h-4 w-4 text-gray-500" />
                          </Button>
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

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Exibindo {startIndex + 1} a {Math.min(endIndex, data.length)} de {data.length} itens
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Próximo
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
