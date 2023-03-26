import api from "../http";
import {AxiosResponse} from "axios"
import http from "../http";
// import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    // @ts-ignore
    static async signin(nickname: string, password: string):Promise<AxiosResponse<any>> {
        return api.post<any>('/auth/signin',{nickname,password})
    }
    // @ts-ignore
    static async signup(nickname: string, password: string, name: string, surname: string):Promise<AxiosResponse<any>> {
        return api.post<any>('/auth/signup',{nickname, password, name, surname})
    }

    // @ts-ignore
    static async logut():Promise<AxiosResponse<any>> {
        return api.delete<any>('/auth/logout',{})
    }

    static async whoAmI():Promise<AxiosResponse<any>> {
        return api.get<any>('/user/me')
    }

}
