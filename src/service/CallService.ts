import {AxiosResponse} from "axios"
import http from "../http";

import  axios from "axios";
// import {AuthResponse} from "../models/response/AuthResponse";

export const API_URL = window.location.origin;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    return config;
})

export default class CallService {
    static async deleteRoom(query):Promise<AxiosResponse<any>> {
        return api.delete<any>('/video/finish', {params: {room_id: query}})
    }
}
