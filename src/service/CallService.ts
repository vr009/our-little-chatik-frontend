import api from "../http";
import {AxiosResponse} from "axios"
import http from "../http";

import  axios from "axios";
// import {AuthResponse} from "../models/response/AuthResponse";

export default class CallService {
    static async deleteRoom(query):Promise<AxiosResponse<any>> {
        return api.get<any>('finish', {params: {room_id: query}})
    }
}
