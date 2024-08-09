"use server"

import apiClient from "./apiClient"

export async function getPaginationData( page: number ) {
    try {
        const res = await apiClient.get(`/admin/data?page=${page}`)
        return res.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}