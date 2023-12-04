"use client"

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, CreditCard, ShoppingCart, Wallet2 } from "lucide-react";
import { AppContext } from "@/app/Providers";
import User from "../components/User";
import { weekDays, months } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardBody } from "../components/Card";

const Home = () => {
    const router = useRouter();
    const { user, logout } = useContext(AppContext);
    const [ selectedStore, setSelectedStore ] = useState("");

    const today = new Date();

    return (
        <main className="w-full min-h-screen h-full flex flex-col gap-5 p-4">
            <header className="w-full flex justify-between items-center">
                <User src={user?.image ?? undefined} name={user?.name} description={weekDays[today.getDay()] + " " + today.toLocaleDateString("pt-br").split("/")[0]}/>
                <Button onClick={logout} size="icon" variant="outline" className="w-8 h-8"><LogOut size={18}/></Button>
            </header>

            <Select defaultValue={selectedStore} onValueChange={v => setSelectedStore(v)}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Selecione uma loja" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Loja</SelectLabel>
                        <SelectItem value="espacoandrealuiza" className="capitalize cursor-pointer">Espaco Andrea Luiza</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <section className="flex flex-col">
                <h1 className="text-lg text-zinc-700 font-semibold">{months[today.getMonth()]}</h1>
                <h3 className="text-sm text-zinc-500/80 font-semibold">Receita do mês</h3>

                <div className="flex gap-2 items-center justify-center max-w-fit font-semibold text-3xl text-zinc-700 mt-2">
                    <span>R$</span>
                    <h1>3000.00</h1>
                </div>
            </section>

            <section className="w-full grid grid-cols-2 gap-4">
                <Card className="items-center justify-center" onClick={() => router.push("/app/home/payment")}>
                    <CardBody className="gap-2">
                        <CreditCard size={45} className="text-zinc-600"></CreditCard>
                        <p className="text-zinc-600 font-semibold">Receber</p>
                    </CardBody>
                </Card>
                <Card className="items-center justify-center">
                    <CardBody className="gap-2">
                        <Wallet2 size={45} className="text-zinc-600"></Wallet2>
                        <p className="text-zinc-600 font-semibold">Faturamento</p>
                    </CardBody>
                </Card>
                <Card className="items-center justify-center" disabled>
                    <CardBody className="gap-2">
                        <ShoppingCart size={45} className="text-zinc-600"></ShoppingCart>
                        <p className="text-zinc-600 font-semibold">Carrinho</p>
                    </CardBody>
                </Card>
            </section>
        </main>
    );
}
 
export default Home;