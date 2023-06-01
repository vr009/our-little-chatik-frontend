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

    static async activateChat(chat_id: string):Promise<AxiosResponse<any>> {
        return api.post<any>('/chat/active', {chat_id: chat_id})
    }

    //@ts-ignore
    static async getMessages(chat_id: string):Promise<AxiosResponse<any>> {
        let config = {
            params: {
                chat_id: chat_id.toString(),
                offset: 0,
                limit: 10
            }
        }

        console.warn('aaaaaaa: ', config)
        
        return api.get<any>('/chat/conv', config)
    }

 }
