import axios from 'axios'

export type ResponseSchema<T> = {
  status: "success" | "error";
  message: string;
  data: T;
}

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1"
});

export default apiClient;