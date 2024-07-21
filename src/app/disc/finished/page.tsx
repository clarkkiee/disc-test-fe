import Link from "next/link";

export default function ExamFinishedPage(){
    return (
        <div className="flex w-full min-h-screen justify-center items-center gap-1">
            <p>Your Test finished. Back to</p>
            <Link className="text-blue-700 underlinex" href={'/'}>Home</Link>
        </div>
    )
}