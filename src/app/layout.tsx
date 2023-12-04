import type { Metadata } from "next"

import { CookiesProvider } from "next-client-cookies/server";
import Providers from "./Providers";

import "./globals.css"

export const metadata: Metadata = {
  title: "Salon Payment",
  description: "Gereciamento inteligente de pagamentos para salões de beleza"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-zinc-100 dark:bg-slate-900 dark:text-zinc-100">
        <CookiesProvider>
          <Providers>
            {children}
          </Providers>
        </CookiesProvider>
      </body>
    </html>
  )
}
