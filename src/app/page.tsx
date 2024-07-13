"use client"
import { getAllQuestions } from "@/services/ExamActionServices";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  const getq = async () => {
    const q = await getAllQuestions()
    console.log(q)
  }

  useEffect(() => {
    getq()
  })

  return (
    <>
    <div className="flex flex-col min-h-screen mx-auto justify-center items-center">
      <h1>Landing Page</h1>
      <button onClick={() => router.push('/biodata')}>Start Test</button>
    </div>

    </>
   
  );
}
