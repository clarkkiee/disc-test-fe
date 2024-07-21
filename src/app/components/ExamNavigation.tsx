"use client";

import { getAllQuestions } from "@/services/ExamActionServices";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

export interface IAnswer {
  userId: string;
  questionId: string;
  answer_0: string;
  answer_1: string;
}

interface IQuestionState {
  id: string;
  questionId: string;
  state: string;
  created_at: string;
  updated_at: string;
}

interface IQuestion {
  id: string;
  created_at: string;
  question_state: IQuestionState[];
}

export default function ExamNavigation() {
  const router = useRouter();
  const { examSessionId } = useParams();
  const searchParams = useSearchParams();
  const currentQuestionId = searchParams.get("question");

  const [allQuestion, setAllQuestion] = useState<IQuestion[]>();

  const [answer, setAnswer] = useState<IAnswer[]>([]);

  const fetchAllQ = useCallback(async () => {
    const questions = await getAllQuestions();
    setAllQuestion(questions.data);
  }, []);

  const fetchAnswerForFlag = () => {
    if(!localStorage.getItem('answer')){
      setAnswer([])
    } else {
      const answer : IAnswer[] = JSON.parse(localStorage.getItem('answer')!)
      setAnswer(answer)
    }
}   
  
  const checkFlag = (id: string) => {
    const checkQuestionState = answer.find(ans => ans.questionId === id);
    return checkQuestionState ? true : false
  }

  const handleNavigation = (questionId: string) => {
    router.push(`/disc/${examSessionId}?question=${questionId}`);
  };

  useEffect(() => {
    fetchAllQ()
    fetchAnswerForFlag()
  }, [fetchAllQ, currentQuestionId]);

  return (
      <div className="flex flex-col h-min justify-start items-center bg-white rounded-xl shadow-xl border-[1px] gap-4 p-8">
          <p className="text-2xl font-semibold">Daftar Soal</p>
          <div className="grid grid-cols-5 text-black gap-2 items-center">
          {allQuestion?.map((q, index) => (
              <button
              onClick={() => handleNavigation(q.id)}
              className={`w-8 h-8 rounded-sm justify-center text-white flex items-center ${checkFlag(String(q.id)) ? 'bg-green-700' : 'bg-blue-500'}`}
              key={index}
              >
              {q.id}
              </button>
          ))}
          </div>
      </div>
  );
}
