"use client"

import { FormEvent, useEffect, useRef, useState, useContext } from "react";
import { AppContext } from "./Providers";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useCookies } from "next-client-cookies";
import Loading from "./components/Loading";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const App = () => {
    const { user, setUser } = useContext(AppContext);
    const router = useRouter();
    const cookies = useCookies();

    const [ remeber, setRemeber ] = useState(true);
    const [ error, setError ] = useState<string>();
    const [ loading, setLoading ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const email = typeof window !== "undefined" ? window.localStorage.getItem("email") : null; 

    useEffect(() => {
        if(email && emailRef.current) emailRef.current.value = email;
    }, []);

    async function handleClick(e: FormEvent) {
        e.preventDefault();
        if(remeber && emailRef.current && typeof window !== "undefined") window.localStorage.setItem("email", emailRef.current.value);

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value

        try {
            setLoading(true);
            
            const { data } = await axios.post("/api/auth/signin", JSON.stringify({
                email, password
            }), { headers: {
                "Content-Type": "application/json"
            }});

            cookies.set("auth", data.token);
            setUser(data.user);

            router.push("/app/home");
        } catch (error) {
            if(error instanceof AxiosError) setError(error.response?.data.message)
        }

        setLoading(false);
    }

    return (
        <main className="w-full h-screen flex items-center justify-center">
            <form onSubmit={handleClick} className="w-96 h-96 bg-white flex flex-col items-center justify-center gap-4 shadow-lg rounded-xl">
                <input onFocus={() => setError(undefined)} ref={emailRef} type="email" placeholder="Email" className="bg-zinc-100 rounded-lg p-2 px-3 border-2"/>
                <div className="max-w-fit relative flex justify-center items-center">
                    <input onFocus={() => setError(undefined)} ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="Senha" className="bg-zinc-100 rounded-lg p-2 px-3 border-2"/>
                    <Button type="button" onClick={() => setShowPassword(showPassword => !showPassword)} className="absolute right-2 w-8 h-8" size="icon" variant="ghost">
                        { showPassword ? <EyeOff/> : <Eye/>}
                    </Button>
                </div>

                { error && <p className="text-red-500 font-medium text-center">{ error }</p> }

                <Button disabled={loading} type="submit" className="items-center">
                    Entrar
                    { loading && <Loading className="ml-2 w-4 h-4"/> }
                </Button>
            </form>
        </main>
    );
}
 
export default App;