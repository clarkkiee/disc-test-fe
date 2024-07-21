import Loading from "./loading";
import ExamPageClient from "./page.client";
import { Suspense } from 'react' 
export default function page(){
    return (
        <Suspense fallback={<Loading/>}>
            <div className="flex mx-auto bg-white w-[70%] h-[80vh] justify-center items-center rounded-xl shadow-xl border-[1px]">
                <ExamPageClient/>
            </div>
        </Suspense>
    )
}