import api from "../http";
import {AxiosResponse} from "axios"
import http from "../http";

import  axios from "axios";
// import {AuthResponse} from "../models/response/AuthResponse";

export default class ChatListService {
    // @ts-ignore
    static async getList():Promise<AxiosResponse<any>> {
        return api.get<any>('/chat/list');
    }

    static async searchContacts(query):Promise<AxiosResponse<any>> {
        return api.get<any>('/user/search', {params: {name: query}})
    }

    static async addChat(ids: string[]):Promise<AxiosResponse<any>> {
        console.log(ids);
        return api.post<any>('/chat/new', {participants: ids})
    }
}
