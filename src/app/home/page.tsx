"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NavBar from '@/components/NavBar'; // Importando o NavBar
import { BarChart3, FileText, Settings } from 'lucide-react';
import { useQueryGetOrgaoById } from '@/hooks/Compras/useQueryGetById';

export default function HomePage() {
  const { data, isLoading, error } = useQueryGetOrgaoById(44207);
  const [showResults, setShowResults] = useState(false); // Estado para controlar a exibição dos resultados

  const handleShowResults = () => {
    setShowResults(!showResults); // Alterna a exibição dos resultados
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar /> 

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Consulta de Compras</h2>
          <p className="text-gray-600">Gerencie todas as suas compras e aquisições de forma eficiente e transparente.</p>
        </section>

        <section className="mb-8">
          <Button variant="outline" onClick={handleShowResults}>
            Mostrar Resultados ICMBIO
          </Button>
          {showResults && (
            <pre className="mt-4 bg-gray-100 p-4 rounded">
              {isLoading ? "Carregando..." : error ? "Erro ao carregar os dados." : JSON.stringify(data, null, 2)}
            </pre>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Processos em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Ver Processos</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Gerar Relatórios</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Ajustar Configurações</Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-gray-100 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; 2024 ICMBIO - Instituto Chico Mendes de Conservação da Biodiversidade. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
