"use client";

import { AuthContextProvider } from "@/services/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-[100%] min-h-screen justify-between mx-auto items-center ">
      <AuthContextProvider>
        <div>Sidebar</div>
          {children}
        <div>Exam Navigation</div>
      </AuthContextProvider>
    </div>
  );
}