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
        try {
            const response = ChatListService.search(arg)
                .catch((e:any) => {
                    dispatch(setError(e.message))
                })
                    //@ts-ignore
                    dispatch(setContacts(response.data.user))
                    dispatch(setError(null))

        } catch (e:any) {
            dispatch(setError(e.response.data.error.message))
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
    }
})

export const {setError,setContacts} = contactSlice.actions;

export default contactSlice.reducer
