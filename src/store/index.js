import {configureStore} from "@reduxjs/toolkit";
import chatListReducer from "./chatListSlice.js"
import messageListReducer from "./messagesSlice.js"

export default configureStore({
    reducer:{
        chatList: chatListReducer,
        messageList: messageListReducer,
    },
})
