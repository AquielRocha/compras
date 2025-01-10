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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText, Loader, X } from "lucide-react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Materiais {
  codigo_item?: number;
  codigo_do_item?: string;
  nome_item?: string;
  nome_do_grupo?: string;
  descricao_item?: string;
  descricao_do_item?: string;
  nome_grupo?: string;
  nome_classe?: string;
  nome_pdm?: string;
  codigo_ncm?: string;
  data_hora_atualizacao?: Date;
}

interface SelectedItem {
  id: string | number;
  nome: string;
  quantidade: number;
}

export const DataTable = ({ data }: { data: Materiais[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Materiais[]>(data);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleAddItem = (id: string | number, nome: string, quantidade: number) => {
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

  const handleSearch = () => {
    setLoading(true);

    setTimeout(() => {
      const normalizedSearch = searchTerm
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase();

      const filtered = data.filter((item) => {
        const fieldsToSearch = [
          item.codigo_do_item,
          item.nome_item,
          item.descricao_do_item,
          item.nome_do_grupo,
          item.nome_classe,
          item.codigo_ncm,
        ];

        return fieldsToSearch.some((field) =>
          (field || "").toLowerCase().includes(normalizedSearch)
        );
      });

      setFilteredData(filtered);
      setLoading(false);
    }, 500);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setFilteredData(data);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const groupedData = filteredData.reduce((acc, item) => {
    const groupKey = item.nome_do_grupo || "Outros";
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, Materiais[]>);

  return (
    <Card className="w-full">
      <CardHeader>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6 flex gap-4 items-center">
          <Input
            type="text"
            placeholder="Buscar por código, grupo, classe ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
          <Button variant="outline" onClick={handleClearFilter}>
            <X className="mr-2 h-4 w-4" />
            Limpar Filtro
          </Button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
          </div>
        ) : (
          <ScrollArea className="h-[600px] pr-4">
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(groupedData).map(([nome_do_grupo, items]) => (
                <AccordionItem key={nome_do_grupo} value={nome_do_grupo} className="border-b">
                  <AccordionTrigger className="bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80">
                    <span className="font-medium">{nome_do_grupo}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Código</TableHead>
                          <TableHead>Nome</TableHead>
                          <TableHead className="hidden">Descrição</TableHead>
                          <TableHead className="w-[120px] text-right">Quantidade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.codigo_do_item || item.codigo_item}>
                            <TableCell className="font-medium">{item.codigo_do_item || item.codigo_item}</TableCell>
                            <TableCell>
                              {item.nome_item || item.nome_do_grupo}
                              <div className="text-sm text-muted-foreground">
                                {item.descricao_do_item || item.descricao_item}
                              </div>
                            </TableCell>
                            <TableCell className="hidden">{item.descricao_do_item || item.descricao_item}</TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                min={1}
                                onChange={(e) =>
                                  handleAddItem(
                                    item.codigo_do_item || item.codigo_item || "",
                                    item.nome_item || item.nome_do_grupo || "",
                                    parseInt(e.target.value, 10) || 0
                                  )
                                }
                                className="w-20 text-right"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-6">
        <Button variant="default" onClick={handleGeneratePDF}>
          <FileText className="mr-2 h-4 w-4" />
          Gerar PDF
        </Button>
      </CardFooter>
    </Card>
  );
};
