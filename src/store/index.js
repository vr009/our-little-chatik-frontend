import {configureStore} from "@reduxjs/toolkit";
import chatListReducer from "./chatListSlice.js"
import messageListReducer from "./messagesSlice.js"
import modalReducer from "./modalSlice.js"
import userSlice from "./userSlice.ts";
import contactSlice from "./contactSlice.ts";

export default configureStore({
    reducer:{
        chatList: chatListReducer,
        // messageList: messageListReducer,
        modal: modalReducer,
        user: userSlice,
        contacts: contactSlice
    },
})
