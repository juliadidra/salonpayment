import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    className?: string
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
}

export const CardTitle = ({ className, ...rest }: CardTitleProps) => {
    return (
        <h2 {...rest} className={cn("text-start text-lg font-semibold text-zinc-600", className)}>{ rest.children }</h2>
    );
}

export const CardBody = ({ className, ...rest }: CardBodyProps) => {
    return (
        <div {...rest} className={cn("w-full flex flex-col items-center justify-center", className)}>
            { rest.children }
        </div>
    );
}


export const Card = ({ className, ...rest }: CardProps) => {
    return (
        <button className={cn("w-full h-40 bg-white shadow-md rounded-xl flex flex-col gap-2 p-3 py-2 disabled:opacity-50",  className)} {...rest}>
            { rest.children }
        </button>
    );
}