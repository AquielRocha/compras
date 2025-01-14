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
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GenericMaterial {
  id: number;
  groupName: string;
  className: string;
  pdmName: string;
  itemCode: string | number;
  itemDescription: string;
  extraInfo?: string; // Para campos adicionais, como `codigo_ncm` ou `data_hora_atualizacao`
}

interface DataTableProps {
  data: GenericMaterial[];
  loading?: boolean;
  onAddToCart: (item: GenericMaterial) => void;
}

export const DataTable = ({ data, loading = false, onAddToCart }: DataTableProps) => {
  const groupedData = data.reduce((acc, item) => {
    const groupKey = item.groupName || "Outros";
    const classKey = item.className || "Sem Classe";
    const pdmKey = item.pdmName || "Sem PDM";

    if (!acc[groupKey]) {
      acc[groupKey] = {};
    }
    if (!acc[groupKey][classKey]) {
      acc[groupKey][classKey] = {};
    }
    if (!acc[groupKey][classKey][pdmKey]) {
      acc[groupKey][classKey][pdmKey] = [];
    }
    acc[groupKey][classKey][pdmKey].push(item);
    return acc;
  }, {} as Record<string, Record<string, Record<string, GenericMaterial[]>>>);

  const renderAccordionContent = (items: GenericMaterial[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Código do Item</TableHead>
          <TableHead>Descrição do Item</TableHead>
          {items.some((item) => item.extraInfo) && <TableHead>Extra</TableHead>}
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.itemCode}>
            <TableCell className="font-medium">{item.itemCode}</TableCell>
            <TableCell>{item.itemDescription}</TableCell>
            {item.extraInfo && <TableCell>{item.extraInfo}</TableCell>}
            <TableCell>
              <Button onClick={() => onAddToCart(item)}>Adicionar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="w-full">
      <CardHeader />
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-muted-foreground" />
          </div>
        ) : (
          <ScrollArea className="h-[600px] pr-4">
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(groupedData).map(([groupName, classes]) => (
                <AccordionItem key={groupName} value={groupName}>
                  <AccordionTrigger className="bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80">
                    {groupName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="single" collapsible className="w-full">
                      {Object.entries(classes).map(([className, pdms]) => (
                        <AccordionItem key={className} value={className}>
                          <AccordionTrigger className="px-4 py-2 hover:bg-secondary/50">
                            {className}
                          </AccordionTrigger>
                          <AccordionContent>
                            <Accordion type="single" collapsible className="w-full">
                              {Object.entries(pdms).map(([pdmName, items]) => (
                                <AccordionItem key={pdmName} value={pdmName}>
                                  <AccordionTrigger className="px-4 py-2 hover:bg-secondary/30">
                                    {pdmName}
                                  </AccordionTrigger>
                                  <AccordionContent className="pt-4 pb-2">
                                    {renderAccordionContent(items)}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-6">
        <Button variant="default">
          <FileText className="mr-2 h-4 w-4" />
          Gerar PDF
        </Button>
      </CardFooter>
    </Card>
  );
};
