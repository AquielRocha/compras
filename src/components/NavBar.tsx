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
import { Menu, X, LogOut, LaptopMinimal } from "lucide-react";
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

  const exit = (e:any) => {
    e.preventDefault();
    deleteCookie("UP");
    deleteCookie("JwtToken");
    router.push("/");
  };

  return (
    <div className="flex items-start justify-start h-full top-0 left-2 absolute">
      <Drawer direction="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <DrawerContent className="h-full w-64 fixed z-50 bg-white shadow-lg">
          <DrawerHeader>
            <button className="mb-5" onClick={toggleDrawer}>
              <X />
            </button>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>

          <Accordion type="single" collapsible>
            <AccordionItem value="home">
              <AccordionTrigger>
                <button onClick={() => { setIsDrawerOpen(false); redirect("/home"); }}>
                  Home
                </button>
              </AccordionTrigger>
            </AccordionItem>
            <AccordionItem value="reports">
              <AccordionTrigger>
                <button onClick={() => { setIsDrawerOpen(false); redirect("/reports"); }}>
                  Relatórios
                </button>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>

          <DrawerFooter className="space-y-2">
            {Number.parseInt(decodedCookie) === 12 && (
              <Link href="/" target="_blank">
                <LaptopMinimal className="w-5 h-5" /> GLPI
              </Link>
            )}
            <Link href="/" onClick={exit}>
              <LogOut className="w-5 h-5" /> Sair
            </Link>
          </DrawerFooter>
        </DrawerContent>

        <DrawerTrigger asChild>
          <Button variant="ghost" onClick={toggleDrawer} className="p-2">
            <Menu className="text-black" />
          </Button>
        </DrawerTrigger>
      </Drawer>
    </div>
  );
};

export default NavBar;
