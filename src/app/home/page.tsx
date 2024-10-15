"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";
import { BarChart3, FileText, Settings } from "lucide-react";
import { useQueryGetOrgaoById } from "@/hooks/Orgao/useQueryGetById";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-6xl font-bold text-primary">Página Inicial</h1>
        <p className="text-lg text-gray-500">Aqui vai um  DashBoard</p>
      </div>
    </div>
  );
}
