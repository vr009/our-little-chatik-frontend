import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../models/IUser";
import {loginRequest, registrationRequest} from "../models/request/AuthRequest";
import AuthService from "../service/AuthService";


export const signin  = createAsyncThunk(
    'user/signin',
    // @ts-ignore
    async function (arg: loginRequest,{dispatch}) {
        try {
            const response = AuthService.signin(arg.nickname, arg.password)
                .catch((e:any) => {
                    dispatch(setError(e.message))
                })
                    //@ts-ignore
                    localStorage.setItem('token', response.data.jwt);
                    dispatch(setAuth(true));
                    //@ts-ignore
                    dispatch(setUser(response.data.user))
                    dispatch(setError(null))

        } catch (e:any) {
            dispatch(setError(e.response.data.error.message))
            console.log(e);
        }
    }
);

export const signup  = createAsyncThunk(
    'user/signup',
    // @ts-ignore
    async function (arg: registrationRequest,{dispatch}) {
        try {
            const response = AuthService.signup(arg.nickname, arg.password, arg.name, arg.surname)
                .catch((e:any) => {
                    dispatch(setError(e.message))
                })
            //@ts-ignore
            localStorage.setItem('token', response.data.jwt);
            dispatch(setAuth(true));
            //@ts-ignore
            dispatch(setUser(response.data.user))
            dispatch(setError(null))

        } catch (e:any) {
            dispatch(setError(e.response.data.error.message))
            console.log(e);
        }
    }
);

interface userState {
    user: IUser
    isAuth: boolean,
    error: boolean,
    status: string
}


const initialState = {
    user: {},
    isAuth: false,
    error: false,
    status: ''
} as userState

// @ts-ignore
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        logout(state) {
            state.isAuth = false;
            localStorage.removeItem('token');
        }
    }
})

export const {setAuth,setUser,setError,logout} = userSlice.actions;

export default userSlice.reducer
