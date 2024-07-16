"use client";
import { AuthContext } from "@/services/AuthContext";
import { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  getQuestionsById,
  submitAnswer,
} from "@/services/ExamActionServices";
import { useRouter } from "next/navigation";
import { unsetAuthToken } from "@/services/AuthTokenService";

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

export default function ExamPageClient() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { examSessionId } = useParams();
  const [answer, setAnswer] = useState<IAnswer[]>([]);
  const searchParams = useSearchParams();
  const questionIdReq = searchParams.get("question");
  const [questions, setQuestions] = useState<IQuestion | null>();
  const [ examSubmitState, setExamSubmitState ] = useState<boolean>(false)

  const fetchExamReq = useCallback(async () => {
    if (currentUser && questionIdReq) {
      const questionsData = await getQuestionsById(questionIdReq);
      setQuestions(questionsData);
    }
  }, [currentUser, questionIdReq]);

  const handleExamNavigation = (state: string) => {
    let currentQId = parseInt(questionIdReq!)
    if (state === "next") {
      router.push(
        `/disc/${examSessionId}?question=${currentQId+1}`
      );
    } else {
      router.push(
        `/disc/${examSessionId}?question=${currentQId-1}`
      );
    }
  };

  const checkAnswerFromLocalStorage = () => {
    if(!localStorage.getItem('answer')){
      setQuestions(null)
    } else {
      const answer : IAnswer[] = JSON.parse(localStorage.getItem('answer')!)
      setAnswer(answer)
    }
  }

  useEffect(() => {
    fetchExamReq();
    checkAnswerFromLocalStorage();
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
        localStorage.setItem('answer', JSON.stringify(updatedAnswers))
        return updatedAnswers;
      } else {
        const newAnswer: IAnswer = {
          userId: currentUser!.id,
          questionId: questionIdReq!,
          answer_0: name === "answer_0" ? value : "",
          answer_1: name === "answer_1" ? value : "",
        };
        localStorage.setItem('answer', JSON.stringify([...prevAnswers, newAnswer]))
        return [...prevAnswers, newAnswer];
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(examSubmitState){
      const examFinishedStatus = await submitAnswer(answer)
      if(examFinishedStatus === 1){
        localStorage.clear()
        await unsetAuthToken()
        router.push(`/disc/${examSessionId}/finished`)
      } else {
        router.refresh()
      }
     
    }
  };

  const getAnswer = (type: "answer_0" | "answer_1") => {
    const answerForCurrentQuestion = answer.find(ans => ans.questionId === questionIdReq);
    return answerForCurrentQuestion ? answerForCurrentQuestion[type] : "";
  }
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        {questions?.question_state.map((state, index) => (
          <div key={state.id}>{`${String.fromCharCode(65 + index)}. ${state.state}`}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">

          <div className="flex gap-6 items-center">
            <div className="flex flex-col gap-2.5 justify-evenly ">
              <div className="text-transparent select-none">EMPTY</div>
              <div>Paling Menggambarkan</div>
              <div>Paling Tidak Menggambarkan</div>
            </div>
            <div className="flex flex-col gap-4 justify-evenly items-center">
              <div className="flex gap-4">
                <p>A</p>
                <p>B</p>
                <p>C</p>
                <p>D</p>
              </div>
              <div className="flex gap-4">
                {questions?.question_state.map((state, index) => (
                  <input
                    key={state.id}
                    type="radio"
                    id="paling_menggambarkan"
                    name="answer_0"
                    value={`${String.fromCharCode(65 + index)}`}
                    checked={getAnswer("answer_0") === `${String.fromCharCode(65 + index)}`}
                    onChange={handleChange}
                    className="scale-125"
                  />
                ))}
              </div>
            
              <div className="flex gap-4">
                {questions?.question_state.map((state, index) => (
                  <input
                    key={state.id}
                    type="radio"
                    id="paling_tidak_menggambarkan"
                    name="answer_1"
                    value={`${String.fromCharCode(65 + index)}`}
                    checked={getAnswer("answer_1") === `${String.fromCharCode(65 + index)}`}
                    onChange={handleChange}
                    className="scale-125"
                  />
                ))}
              </div>
            </div>
          </div>

        <div className="flex gap-4">
          {
            questionIdReq !== String(1) ?
            <button onClick={() => handleExamNavigation("previous")}>
              Previous
            </button> : 
            <button disabled={true} onClick={() => handleExamNavigation("previous")}>
              Previous
              
            </button>  
          }
          {
            questionIdReq === String(5) ? 
            <button onClick={() => {
              setExamSubmitState(true)
              handleSubmit
            }}>Finish</button> : 
            <button onClick={() => handleExamNavigation("next")}>Next</button>
          }
        </div>
      </form>
    </div>
  );
}
