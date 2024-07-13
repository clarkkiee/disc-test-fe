import Loading from "./loading";
import ExamPageClient from "./page.client";
import { Suspense } from 'react' 
export default function page(){
    return (
        <Suspense fallback={<Loading/>}>
            <ExamPageClient/>
        </Suspense>
    )
}