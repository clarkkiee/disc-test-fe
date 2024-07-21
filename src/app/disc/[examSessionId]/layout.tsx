"use client";

import ExamNavigation from "@/app/components/ExamNavigation";
import { AuthContextProvider } from "@/services/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-[100%] bg-green-50 px-[7%] min-h-screen mx-auto items-center">
      <AuthContextProvider>
          <ExamNavigation/>
          {children}
      </AuthContextProvider>
    </div>
  );
}