"use server"

import pyApiService from "./pyApiClient"

export async function processDiscData( payload : string[] ){
    try {
        const res = await pyApiService.post('/data/process', {payload})
        return res.data.processed_data
    } catch (error) {
        console.error(error)
        return null
    }
}