"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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
import { Input } from "@/components/ui/input";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Materiais {
  codigo_item: number;
  nome_item: string;
  codigo_grupo: number;
  descricao_item: string;
  nome_grupo: string;
  nome_classe: string;
  data_hora_atualizacao: Date;
}

interface SelectedItem {
  id: number;
  nome: string;
  quantidade: number;
}

export const DataTable = ({ data }: { data: Materiais[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleAddItem = (id: number, nome: string, quantidade: number) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantidade } : item
        );
      }
      return [...prev, { id, nome, quantidade }];
    });
  };

  const handleGeneratePDF = () => {
    const documentDefinition = {
      content: [
        { text: "Lista de Itens Selecionados", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto"],
            body: [
              ["ID", "Nome", "Quantidade"],
              ...selectedItems.map((item) => [
                item.id.toString(),
                item.nome,
                item.quantidade.toString(),
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download("extratoInsumos.pdf");
  };

  const filteredData = data.filter((item) => {
    const normalizedSearch = searchTerm
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const normalizedName = item.nome_item
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return (
      item.codigo_item.toString().includes(normalizedSearch) ||
      normalizedName.includes(normalizedSearch)
    );
  });

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.nome_item]) {
      acc[item.nome_item] = [];
    }
    acc[item.nome_item].push(item);
    return acc;
  }, {} as Record<string, Materiais[]>);

  return (
    <div className="w-full p-6">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(groupedData).map(([nome_item, items]) => (
          <AccordionItem key={nome_item} value={nome_item} className="border-b">
            <AccordionTrigger className="bg-gray-50 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <span >{nome_item}</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] font-bold">CATMAT</TableHead>
                    <TableHead className="font-bold">Descrição do item</TableHead>
                    <TableHead className="font-bold">Quantidade</TableHead>
                    <TableHead className="text-right font-bold">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.codigo_item} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{item.codigo_item}</TableCell>
                      <TableCell>{item.descricao_item}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={1}
                          onChange={(e) =>
                            handleAddItem(
                              item.codigo_item,
                              item.nome_item,
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddItem(item.codigo_item, item.nome_item, 1)
                          }
                        >
                          Adicionar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex justify-end border-t p-4">
        <Button variant="default" onClick={handleGeneratePDF}>
          Gerar PDF
        </Button>
      </div>
    </div>
  );
};
