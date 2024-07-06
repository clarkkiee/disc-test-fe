"use client";

import { AuthContextProvider } from "@/services/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <div>{children}</div>
    </AuthContextProvider>
  );
}