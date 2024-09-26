"use client";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { deleteCookie, getCookie } from "cookies-next";
import { Menu, X, LogOut, LaptopMinimal, Home, BarChart2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const cookie = getCookie("UP");
  const decodedCookie = cookie ? atob(cookie) : "0";

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const redirect = (path: string) => {
    router.push(path);
  };

  const exit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    deleteCookie("UP");
    deleteCookie("JwtToken");
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 z-50">
      <Drawer direction="left" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="h-full w-72 fixed z-50 bg-white shadow-lg">
          <DrawerHeader className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <DrawerTitle className="text-2xl font-bold text-primary">Menu</DrawerTitle>
              <Button variant="ghost" size="icon" onClick={toggleDrawer} className="hover:bg-gray-100">
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
          </DrawerHeader>

          <div className="py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="home">
                <AccordionTrigger className="py-2 px-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center" onClick={() => { setIsDrawerOpen(false); redirect("/home"); }}>
                    <Home className="mr-2 h-5 w-5" />
                    <span>Home</span>
                  </div>
                </AccordionTrigger>
              </AccordionItem>
              <AccordionItem value="reports">
                <AccordionTrigger className="py-2 px-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center" onClick={() => { setIsDrawerOpen(false); redirect("/reports"); }}>
                    <BarChart2 className="mr-2 h-5 w-5" />
                    <span>Relatórios</span>
                  </div>
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          </div>

          <DrawerFooter className="p-4 border-t">
            {Number.parseInt(decodedCookie) === 12 && (
              <Link href="/" target="_blank" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                <LaptopMinimal className="w-5 h-5 mr-2" />
                <span>GLPI</span>
              </Link>
            )}
            <Link href="/" onClick={exit} className="flex items-center py-2 px-4 text-red-600 hover:bg-red-50 rounded transition-colors">
              <LogOut className="w-5 h-5 mr-2" />
              <span>Sair</span>
            </Link>
          </DrawerFooter>
        </DrawerContent>

        <DrawerTrigger asChild>
          <Button variant="outline" size="icon" className="m-4 hover:bg-gray-100">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DrawerTrigger>
      </Drawer>
    </div>
  );
};

export default NavBar;