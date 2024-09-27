import { useState } from 'react';
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
  averagePrice: number | null;
}

const PriceModal: React.FC<PriceModalProps> = ({ isOpen, onClose, averagePrice }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Média do Preço</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-lg">
            A média de preço deste item  é:{" "}
            <span className="font-semibold text-green-600">
              ${averagePrice ? averagePrice.toFixed(2) : "N/A"}
            </span>
          </p>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default PriceModal;
