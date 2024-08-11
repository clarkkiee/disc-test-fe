export default function ExamPage ( {params} : { params: {userId: string} } ) {
    return (
        <div>{params.userId}</div>
    )
}