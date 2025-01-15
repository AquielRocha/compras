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
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface GenericMaterial {
  id: number;
  groupName: string;
  className: string;
  pdmName: string;
  itemCode: string | number;
  itemDescription: string;
  extraInfo?: string;
}

interface DataTableProps {
  data: GenericMaterial[];
  loading?: boolean;
  onAddToCart: (item: GenericMaterial) => void;
}

export const DataTable = ({
  data,
  loading = false,
  onAddToCart,
}: DataTableProps) => {
  const groupedData = data.reduce(
    (acc, item) => {
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
    },
    {} as Record<string, Record<string, Record<string, GenericMaterial[]>>>
  );

  const renderAccordionContent = (items: GenericMaterial[]) => (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-[100px]">Código do Item</TableHead>
          <TableHead>Nome do Item</TableHead>
          <TableHead>Especificação</TableHead>
          {items.some((item) => item.extraInfo) && <TableHead>Extra</TableHead>}
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const [name, ...specificationParts] = item.itemDescription.split(",");
          const specification = specificationParts.join(",").trim();
          return (
            <TableRow key={item.itemCode} className="hover:bg-gray-100">
              <TableCell className="font-medium">{item.itemCode}</TableCell>
              <TableCell>{name.trim() || "N/A"}</TableCell>
              <TableCell>{specification || "N/A"}</TableCell>
              {item.extraInfo && <TableCell>{item.extraInfo}</TableCell>}
              <TableCell>
                <Button onClick={() => onAddToCart(item)} variant="outline" size="sm" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                  Adicionar
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  return (
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-8 w-8 text-blue-400" />
          </div>
        ) : (
          <ScrollArea className="h-[600px] pr-4">
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(groupedData).map(([groupName, classes]) => (
                <AccordionItem key={groupName} value={groupName}>
                  <AccordionTrigger className="bg-blue-100 text-blue-800 px-4 py-2 hover:bg-blue-200 transition-colors">
                    {groupName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l-2 border-blue-200">
                      <Accordion type="single" collapsible className="w-full">
                        {Object.entries(classes).map(([className, pdms]) => (
                          <AccordionItem key={className} value={className}>
                            <AccordionTrigger className="bg-green-100 text-green-800 px-4 py-2 hover:bg-green-200 transition-colors">
                              {className}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-4 border-l-2 border-green-200">
                                <Accordion
                                  type="single"
                                  collapsible
                                  className="w-full"
                                >
                                  {Object.entries(pdms).map(
                                    ([pdmName, items]) => (
                                      <AccordionItem
                                        key={pdmName}
                                        value={pdmName}
                                      >
                                        <AccordionTrigger className="bg-yellow-100 text-yellow-800 px-4 py-2 hover:bg-yellow-200 transition-colors">
                                          {pdmName}
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-4 pb-2">
                                          <div className="pl-4 border-l-2 border-yellow-200">
                                            {renderAccordionContent(items)}
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    )
                                  )}
                                </Accordion>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        )}
      </CardContent>
  );
};

