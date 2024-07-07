"use client";
import { AuthContext } from "@/services/AuthContext";
import { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from 'next/navigation'
import { getAllQuestions } from "@/services/ExamActionServices";

interface IAnswer {
  questionId: string;
  answer: number[];
}

interface IQuestionState {
  id: string;
  questionId: string;
  state: string;
  created_at: string;
  updataed_at: string;
}

interface IQuestion {
  id: string;
  created_at: string;
  question_state: IQuestionState[];
}

export default function ExamPageClient() {
  const { currentUser } = useContext(AuthContext);
  const { examSessionId } = useParams()

  const searchParams = useSearchParams()
 
  const search = searchParams.get('search')

  const [ questions, setQuestions ] = useState<IQuestion[] | null>(null)
  const [ asnwer, setAnswer ] = useState({})

  const fetchExamReq = useCallback(async () => {
    if(currentUser){
      const questionsData = await getAllQuestions()
      setQuestions(questionsData.data)
    }
  }, [currentUser])

  useEffect(() => {
    fetchExamReq()
  }, [fetchExamReq])

  return (
    <div>
      { search }
    </div>
  )
}
