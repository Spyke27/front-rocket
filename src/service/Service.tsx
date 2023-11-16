import axios from "axios";

export const api = axios.create({
    //baseURL: 'https://api-voluntariado.onrender.com'
    baseURL: 'http://localhost:3000'
})

