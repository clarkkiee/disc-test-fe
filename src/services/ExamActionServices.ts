"use server"
import { cookies } from "next/headers";
import apiClient from "./apiClient";
import { getAuthToken, unsetAuthToken } from "./AuthTokenService";
import { IAnswer } from "@/app/disc/[examSessionId]/page.client";

export async function getAllQuestions(){
    try {
        const token = await getAuthToken()
        const res = await apiClient.get('/exam/questions', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getQuestionsById(id: string){
    try {
        const token = await getAuthToken()
        const res = await apiClient.get(`/exam/question/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data.data
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function submitAnswer(answer: IAnswer[]){
    try {
        const token = await getAuthToken()
        if(!token) {
            return null
        }
        const res = await apiClient.post('/exam/submit', {answer}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(res.data.status === "success"){
            return 1
        } else {
            return 0
        }
    } catch (error) {
        console.error(error)
        return null
    }
}