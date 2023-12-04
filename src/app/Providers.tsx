"use client"

import { ReactNode, createContext, useState } from "react";
import { User as UserSchema } from "@prisma/client";
import { useCookies } from "next-client-cookies";

type User = Pick<UserSchema, "id" | "name" | "email" | "image">

interface AppContextProps {
  isDark: boolean
  toggleDark: () => void
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

const AppContextDefaultValues: AppContextProps = {
  isDark: false,
  toggleDark: () => {},
  user: null,
  setUser: () => {},
  logout: () => {}
}

export const AppContext = createContext<AppContextProps>(AppContextDefaultValues);

const htmlRef = typeof document !== "undefined" ? document.getElementsByTagName("html")[0] : null;

export default function Providers({ children }: { children: ReactNode }) {
  const cookies = useCookies();

  const [ dark, setDark ] = useState(false);
  const [ userApp, setUserApp ] = useState<User | null>(JSON.parse(cookies.get("user") ?? "{}"));

  if(dark) htmlRef?.classList.add("dark");
  else htmlRef?.classList.remove("dark");

  function toggleDark() {
    setDark(dark => !dark);
  }

  function logout() {
    cookies.remove("auth");
    setUserApp(null);

    typeof window !== "undefined" && window.location.reload();
  }

  function setUser(user: User) {
    setUserApp(user);
    cookies.set("user", JSON.stringify(user));
  }
  
  return (
    <AppContext.Provider value={{ 
        isDark: dark, 
        toggleDark, 
        user: userApp, 
        setUser: setUser, 
        logout 
      }}
    >
      { children }
    </AppContext.Provider>
  );
}