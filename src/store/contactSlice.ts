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
        dispatch(setStatus('Pending'));
        try {
            const response = ChatListService.searchContacts(arg)
                .then(()=> {
                    //@ts-ignore
                    dispatch(setContacts(response.data.user))
                    dispatch(setError(null))
                    dispatch(setStatus('Fulfilled'));
                })
                .catch((e:any) => {
                    dispatch(setError(e.message))
                    dispatch(setStatus('Error'));
                })

        } catch (e:any) {
            dispatch(setError(e.response.data.error.message));
            dispatch(setStatus('Error'));
            console.log(e);
        }
    }, 300)
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
