import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import type {UserState} from "../../types/types.ts";

const initialState: UserState = {
    data: [],
    status: '',
    error: null,
};

const API_URL = import.meta.env.VITE_API_KEY;
const USERS_URL = `${API_URL}/users`;
export const client = axios.create();

export const getUsersAsync = createAsyncThunk('users/getUsers', async () => {
    const result = await client.get(USERS_URL);
    return result.data;
});

const projectsSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUsersAsync.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    }
});

export default projectsSlice.reducer;