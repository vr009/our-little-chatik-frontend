import api from "../http";
import {AxiosResponse} from "axios"
import http from "../http";
// import {AuthResponse} from "../models/response/AuthResponse";

export default class ChatListService {
    // @ts-ignore
    static async search(name:string):Promise<AxiosResponse<any>> {
        return api.get<any>('/search',{params: {Name: name}});
    }
}
