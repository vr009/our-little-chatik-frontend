import api from "../http";
import {AxiosResponse} from "axios"
import http from "../http";

import  axios from "axios";
// import {AuthResponse} from "../models/response/AuthResponse";

export default class CallService {
    static async deleteRoom(query):Promise<AxiosResponse<any>> {
        return api.delete<any>('/call/finish?room_id='+query)
    }
}
