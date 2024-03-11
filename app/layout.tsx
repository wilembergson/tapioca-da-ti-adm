import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./contexts/Contexto";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tapioca da TI"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap" rel="stylesheet"/>
      </head>
      <body className={inter.className}>
        <GlobalContextProvider>
            {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
