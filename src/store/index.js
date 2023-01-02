import {configureStore} from "@reduxjs/toolkit";
import chatListReducer from "./chatSlice.js"

export default configureStore({
    reducer:{
        chatList: chatListReducer
    },
})
