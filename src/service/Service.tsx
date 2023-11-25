import axios from "axios";
import { getToken } from "./Auth";

export const api = axios.create({
    baseURL: 'https://api-voluntariado.onrender.com'
    //baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(async config => {
    const token = getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
