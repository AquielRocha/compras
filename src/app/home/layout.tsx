import Image from "next/image";
import Background from "../../../public/assets/fundo.png";
import React from "react";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <Toaster />

      <Image
        src={Background}
        alt="Background do site SEDUR (imagem abstrata)"
        layout="fill"
        objectFit="cover" 
        quality={100}
        className="absolute inset-0 z-0"
      />

      {/* Overlay content */}
      <div className="relative h-full w-full flex p-3 z-10 justify-center">
        <div className="flex w-[7%]">
          <NavBar />
        </div>
        <main className="bg-transparent flex-1 px-3 flex justify-center">
          <div className="h-full w-full rounded-lg bg-white p-4 shadow-lg overflow-scroll">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
