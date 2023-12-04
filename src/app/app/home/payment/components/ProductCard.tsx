"use client"

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
    id: string
    name: string
    price: number
    quantity: number
    className?: string

    addProduct: (id: string) => void
    removeProduct: (id: string) => void
}

const ProductCard = ({ id, name, price, className, quantity, addProduct, removeProduct, ...rest }: ProductCardProps) => {


    return (
        <div {...rest} className={cn("flex items-center justify-between w-full", className)}>
            <div>
                <h4 className="font-medium">{ name }</h4>
                <p className="font-semibold text-xs text-zinc-500">R$ { price.toFixed(2) }</p>
            </div>

            <div className="max-w-fit flex items-center justify-center bg-white shadow-md rounded-xl px-2">
                <Button size="icon" variant="ghost" className="w-8" onClick={() => removeProduct(id)}>
                    { quantity !== 0  ? (
                        <Minus size={20}/>
                    ) : (
                        <Trash2 size={20}/>
                    )}
                </Button>
                <input type="number" className="w-8 flex items-center justify-center px-1 text-center" value={quantity}/>
                <Button size="icon" variant="ghost" className="w-8" onClick={() => addProduct(id)}><Plus size={20}/></Button>
            </div>
        </div>
    );
}
 
export default ProductCard;