"use client"

import { useRef, useState } from "react";
import { Product as ProductSchema } from "@prisma/client";
import ProductCard from "./ProductCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"

interface Product extends ProductSchema {
    quantity: number
}

const ProductSection = () => {
    const [ products, setProducts ] = useState<Product[]>([]);

    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    function addProduct(id: string) {

    }

    function removeProduct(id: string) {

    }

    return (
        <section className="flex flex-col w-full flex-1 gap-4">
            { products.map(p => (
                <ProductCard 
                    {...p}
                    key={p.id} 
                    addProduct={addProduct} 
                    removeProduct={removeProduct}
                />
            )) }

            <Button variant="ghost" className="gap-2 justify-start pl-0">
                <Plus size={16} strokeWidth={3}/>
                Adicionar Produto
            </Button>

            <Textarea ref={descriptionRef} placeholder="Descrição da venda (Opcional)" className="mt-auto"/>

            <Button size="lg" onClick={() => console.log(descriptionRef.current?.value)}>
                Finalizar
            </Button>
        </section>
    );
}
 
export default ProductSection;