"use server"
import { cookies } from "next/headers";
import apiClient from "./apiClient";
import { getAuthToken } from "./AuthTokenService";
import { BiodataFields } from "@/app/biodata/page.client";

export async function registerUser( userData : BiodataFields ){
    try {
        const response = await apiClient.post('/user/register', userData);
        const token = response.data.data.authorization
        cookies().set('access_token', token)
        return response.data.data
    } catch (error) {
        console.error(error);
        return null
    }
}

export async function getCurrentUser(){
    try {
        const token = await getAuthToken()
        if(!token){
            return undefined
        }
        const currentUser = await apiClient.get('/user/current', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return currentUser.data.data
    } catch (error) {
        console.error(error);
        return undefined;
    }
}