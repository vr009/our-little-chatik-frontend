import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ChatListService from "../service/ChatListService.js";
import getMessagesRequest from "../models/request/ChatRequest.js"


export const getMessages  = createAsyncThunk(
    'user/login',
    // @ts-ignore
    async function (arg: getMessagesRequest,{dispatch}) {
        try {
            dispatch(setStatus('Pending'))
            ChatListService.getMessages(arg.chat_id)
                .then(response => {
                    console.log('Список сообщений из чата:',response.data);
                    dispatch(setMessages(response.data));
                    //@ts-ignore
                    dispatch(setStatus('Fulfilled'))
                    dispatch(setError(null))
                })
                .catch((e:any) => {
                    dispatch(setError(e.response.status))
                    dispatch(setStatus('Rejected'))
                    
                })
        } catch (e:any) {
            dispatch(setError(e.response))
            console.error(e)
        }
    }
);

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        messages: [],
        activeChat: '',
        status: null,
        error: null
    },
    reducers: {
        setMessages(state, action) {
            console.log('set', action.payload)
            state.messages = action.payload
        },
        pushMessage(state, action) {
            if (state.messages === null) {
                state.messages = action.payload;
            } else if (state.messages.length === 0){
                state.messages = action.payload;
            } else {
                console.log('push', action.payload[0]);
                state.messages.unshift(action.payload[0]);
            }
        },
        setError(state, action) {
            state.error = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setActiveChat(state, action) {
            state.activeChat = action.payload
        },
        setActiveChatName(state, action) {
            state.activeChatName = action.payload
        }
    }
})

export const {setMessages, setError, setStatus, setActiveChat, setActiveChatName, pushMessage} = messageSlice.actions;

export default messageSlice.reducer