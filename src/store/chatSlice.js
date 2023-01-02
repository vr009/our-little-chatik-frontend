import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchChats = createAsyncThunk(
    'chats/FETCHCHATS',
    async function () {
        const response = await fetch('http://localhost:3000/Chats');

        const data = await response.json();

        return data
    }
);

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [],
        status: null,
        error: null
    },
    reducers: {
        toggleChats(state, action) {}
    },
    extraReducers: {
        [fetchChats.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [fetchChats.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.chats = action.payload;
        },
        [fetchChats.rejected]: (state, action) => {},
    }
})

export const {toggleChats} = chatsSlice.actions;

export default chatsSlice.reducer
