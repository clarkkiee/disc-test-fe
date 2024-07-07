"use server"
import { cookies } from "next/headers";
import apiClient from "./apiClient";
import { getAuthToken } from "./AuthTokenService";

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