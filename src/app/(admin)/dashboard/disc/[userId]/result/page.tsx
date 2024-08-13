import ResultPage from "./page.client";

export default function Page ({ params } : { params: {userId: string}}) {
    return (
        <div className="flex px-[7%] py-[4%] justify-center items-center"><ResultPage userId={params.userId}/></div>
    )
}