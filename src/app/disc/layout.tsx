"use client";

import { AuthContextProvider } from "@/services/AuthContext";
import { Suspense } from "react";
import Loading from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <Suspense fallback={<Loading/>}>
        {children}
      </Suspense>
    </AuthContextProvider>
  );
}