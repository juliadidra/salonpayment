import { User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
// import Image from "next/image";

interface UserProps extends HTMLAttributes<HTMLDivElement> {
    src?: string
    name?: string
    description?: string
}

const User = ({ src, name, description, ...rest }: UserProps) => {
    return (
        <div className="flex gap-3 items-center justify-center max-w-fit">
            <div className={cn("rounded-full bg-zinc-500/60 outline outline-2 outline-zinc-700 w-10 h-10 flex items-center justify-center overflow-clip", rest.className)}>
                { src ? (
                    <img src={src} alt="user" width={40} height={40} className="w-full"/>
                ) : (
                    <UserIcon color="white"></UserIcon>
                ) }
            </div>

            <div className="flex flex-col">
                <p className="font-medium text-zinc-800">{name}</p>
                <p className="text-xs font-semibold text-zinc-500">{description}</p>
            </div>
        </div>
    );
}
 
export default User;