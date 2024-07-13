"use client";
import { AuthContext } from "@/services/AuthContext";
import { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  getAllQuestions,
  getQuestionsById,
} from "@/services/ExamActionServices";
import { useRouter } from "next/navigation";

interface IAnswer {
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

export default function ExamPageClient() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { examSessionId } = useParams();
  const [answer, setAnswer] = useState<IAnswer[]>([]);
  const searchParams = useSearchParams();
  const questionIdReq = searchParams.get("question");
  const [questions, setQuestions] = useState<IQuestion | null>(null);

  const fetchExamReq = useCallback(async () => {
    if (currentUser && questionIdReq) {
      const questionsData = await getQuestionsById(questionIdReq);
      setQuestions(questionsData);
    }
  }, [currentUser, questionIdReq]);

  const handleExamNavigation = (state: string) => {
    if (state === "next") {
      router.push(
        `/disc/${examSessionId}?question=${parseInt(questionIdReq!) + 1}`
      );
    } else {
      router.push(
        `/disc/${examSessionId}?question=${parseInt(questionIdReq!) - 1}`
      );
    }
  };

  useEffect(() => {
    fetchExamReq();
  }, [fetchExamReq]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAnswer((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (ans) => ans.questionId === questionIdReq
      );

      if (existingAnswerIndex >= 0) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          ...updatedAnswers[existingAnswerIndex],
          [name]: value,
        };
        return updatedAnswers;
      } else {
        const newAnswer: IAnswer = {
          userId: currentUser!.id,
          questionId: questionIdReq!,
          answer_0: name === "answer_0" ? value : "",
          answer_1: name === "answer_1" ? value : "",
        };
        return [...prevAnswers, newAnswer];
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(answer);
  };

  const getAnswer = (type: "answer_0" | "answer_1") => {
    const answerForCurrentQuestion = answer.find(ans => ans.questionId === questionIdReq);
    return answerForCurrentQuestion ? answerForCurrentQuestion[type] : "";
  }

  return (
    <div>
      <div>
        {questions?.question_state.map((state) => (
          <div key={state.id}>{state.state}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          {questions?.question_state.map((state, index) => (
            <input
              key={state.id}
              type="radio"
              id="paling_menggambarkan"
              name="answer_0"
              value={`${String.fromCharCode(65 + index)}`}
              checked={getAnswer("answer_0") === `${String.fromCharCode(65 + index)}`}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {questions?.question_state.map((state, index) => (
            <input
              key={state.id}
              type="radio"
              id="paling_tidak_menggambarkan"
              name="answer_1"
              value={`${String.fromCharCode(65 + index)}`}
              checked={getAnswer("answer_1") === `${String.fromCharCode(65 + index)}`}
              onChange={handleChange}
            />
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
      <div className="flex gap-4">
        <button onClick={() => handleExamNavigation("previous")}>
          Previous
        </button>
        <button onClick={() => console.log(answer)}>clickme</button>
        <button onClick={() => handleExamNavigation("next")}>Next</button>
      </div>
    </div>
  );
}
