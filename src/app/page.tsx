import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {



  return (
    <div className="min-h-screen flex items-center justify-center">

      <main className="flex flex-col gap-8 items-center">
       <h1>Página Inicial </h1>
       <h2>Aqui Vai Um DashBoard</h2>
      <Link href="/home">
        <Button>Para Home</Button>
      </Link>
      </main>
    </div>
  );
}
