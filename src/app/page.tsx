"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <>
    <div className="flex flex-col min-h-screen mx-auto justify-center items-center">
      <h1>Landing Page</h1>
      <button onClick={() => router.push('/biodata')}>Start Test</button>
    </div>

    </>
   
  );
}
