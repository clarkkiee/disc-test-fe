"use server"

import apiClient from "./apiClient"

export async function getPaginationData( page?: number, search?: string ) {
    try {
        let res = (!search) ? await apiClient.get(`/admin/data?page=${page}`) : await apiClient.get(`/admin/data?page=${1}&search=${search}`)
        if(!res.data.data){
            return null
        } else {
            return res.data.data
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getDetailExamResult(userId: string) {
    try {
        const res = await apiClient.get(`/admin/exam/${userId}/result`)
        return res.data.data
    } catch (error) {
        console.error(error)
        return null
    }
} 