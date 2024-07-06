import apiClient from "./apiClient";

export async function registerUser( userData : any ){
    try {
        const response = await apiClient.post('/user/register', userData);
        console.log(response)
    } catch (error) {
        console.error(error);
        return null
    }
}