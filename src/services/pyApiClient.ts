import axios from 'axios'

export type ResponseSchema<T> = {
  status: "success" | "error";
  message: string;
  data: T;
}

const pyApiService = axios.create({
  baseURL: "https://hammerhead-app-6ddtf.ondigitalocean.app/"
})

export default pyApiService;