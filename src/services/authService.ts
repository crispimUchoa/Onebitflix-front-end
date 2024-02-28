import { AxiosError, AxiosPromise, AxiosResponse } from "axios";
import api from "./api";

interface RegisterParams{
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    birth: string
}

const authService = {
    register: async (params: RegisterParams) => {
        const res = await api.post('/auth/register', params).catch((error)=>{
            if(error.response.status ===    400) return error.response

            return  error
        })
        return res
    }
}

export default authService