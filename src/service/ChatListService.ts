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

    //todo ПОПРАВИТЬ!
    static async searchContacts(query):Promise<AxiosResponse<any>> {
        // return api.get<any>(`/search?${query}`);

        return api.get<any>('/user/search', {params: {name: query}})

        // const params = new URLSearchParams({ foo: 'bar' });
        // params.append('extraparam', 'value');
        // axios.get('/foo', params);
        
    }

}
