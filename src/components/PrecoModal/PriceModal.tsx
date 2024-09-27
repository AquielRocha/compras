import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  prices: number[]; // Mudança: Aceitar um array de preços
}

const PriceModal: React.FC<PriceModalProps> = ({ isOpen, onClose, prices }) => {
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const total = prices.reduce((sum, price) => sum + price, 0);
      const average = prices.length ? total / prices.length : null;
      setTimeout(() => {
        setAveragePrice(average);
        setLoading(false);
      }, 1000); // Simula um delay de 1 segundo para calcular a média
    } else {
      setAveragePrice(null);
    }
  }, [isOpen, prices]);

  // Função para formatar números como moeda brasileira
  const formatCurrency = (value: number | null) => {
    return value !== null ? `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "N/A";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Média do Preço:</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {loading ? (
            <p className="text-lg">Calculando a média...</p> // Mensagem de carregamento
          ) : (
            <div>
              <p className="text-lg">
                A média de preço é:{" "}
                <span className="font-semibold text-green-600">
                  {formatCurrency(averagePrice)}
                </span>
              </p>
              <p className="text-md mt-4">Preços deste item na busca:</p>
              <ul className="list-disc ml-6">
                {prices.map((price, index) => (
                  <li key={index}>{formatCurrency(price)}</li> // Lista de preços formatados
                ))}
              </ul>
            </div>
          )}
        </div>
        <footer className="mt-4 text-sm text-gray-500 text-center">
          Obs: todos esses dados foram retirados do{" "}
          <a href="https://compras.dados.gov.br/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            https://dadosabertos.compras.gov.br/
          </a>
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default PriceModal;
