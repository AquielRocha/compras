

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Materiais {
  codigo_item: number;
  nome_item: string;
}

export const DataTable = ({ data }: { data: Materiais[] }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CATMAT</TableHead>
            <TableHead>Nome do Item</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.codigo_item}>
              <TableCell>{item.codigo_item}</TableCell>
              <TableCell>{item.nome_item}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between items-center">
        <p>
          Exibindo {startIndex + 1} a {Math.min(endIndex, data.length)} de {data.length} itens.
        </p>
        <div className="flex space-x-2">
          <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
            Anterior
          </Button>
          <Button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
