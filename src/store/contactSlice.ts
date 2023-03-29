import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../models/IUser";
import {loginRequest, registrationRequest} from "../models/request/AuthRequest";
import ChatListService from "../service/ChatListService";
import {debounce} from "../utils/utils";


export const searchContacts  = createAsyncThunk(
    'contacts/search',
    // @ts-ignore
    debounce(async function (arg: string,{dispatch}) {
        console.log(arg)
        if (arg === '') {
            dispatch(setError(null));
            dispatch(setStatus(null));
            return
        }
        dispatch(setStatus('Pending'));
        try {
            ChatListService.searchContacts(arg)
                .then((response)=> {
                    if (response.data.length != 0) {
                        dispatch(setError(null))
                        dispatch(setStatus('Fulfilled'));
                        dispatch(setContacts(response.data))
                        console.log(response.data);
                        console.log('все норм');
                    } else {
                        console.log('Не найдено');
                        dispatch(setStatus('NotFound'));
                    }
                })
                .catch((e:any) => {
                    dispatch(setError(e.message))
                    dispatch(setStatus('Error'));
                    
                    console.log('ошибка 2');
                    console.log(e);
                })

        } catch (e:any) {
            dispatch(setError(e.response.data.error.message));
            dispatch(setStatus('Error'));
            console.log(e);
            console.log('ошибка 3');
        }
    }, 500)
);

const initialState = {
    contacts: [],
    status: null,
    error: null
}

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload
        },
        setContacts(state, action) {
            state.contacts = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
    }
})

export const {setError,setContacts,setStatus} = contactSlice.actions;

export default contactSlice.reducer
