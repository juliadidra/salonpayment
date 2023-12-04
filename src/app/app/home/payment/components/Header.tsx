"use client"

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex items-center justify-center relative w-full">
            <Button asChild size="icon" className="absolute left-0 w-8 h-8" variant="ghost">
                <Link href="/app/home"><ChevronLeft/></Link>
            </Button>

            <h1 className="text-xl text-zinc-700 font-semibold">Pagamento</h1>
        </header>
    );
}
 
export default Header;