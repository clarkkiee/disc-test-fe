"use client";
import { AuthContext } from "@/services/AuthContext";
import { useContext } from "react";

export default function ExamPageClient({ params }: any) {
  const { currentUser } = useContext(AuthContext);
  return <h1>{currentUser?.domicile_city}</h1>;
}
