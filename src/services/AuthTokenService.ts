"use server"

import { cookies } from "next/headers"

export async function getAuthToken(){
    return cookies().get('access_token')?.value
}

export async function unsetAuthToken(){
    return cookies().delete('access_token')
}

export async function setAuthToken(token: string){
    return cookies().set('access_token', token, {
        httpOnly: true,
        path: "/",
        expires: 24*60*60*1000
    })
}