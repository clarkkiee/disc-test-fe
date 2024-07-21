"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/services/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={inter.className}>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
