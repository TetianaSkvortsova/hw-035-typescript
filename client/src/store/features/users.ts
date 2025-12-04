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
const client = axios.create({
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc2NDc3MzMyMywiZXhwIjoyMTI0NzY5NzIzfQ.IUe_KrOhq2ALzsx_pnSPLJiBiRftHmTnXc2bXpI3TIg'
    }
});

export const getUsersAsync = createAsyncThunk('users/getUsers', async () => {
    const result = await client.get(USERS_URL);
    return result.data;
});

/*export const addProjectsAsync = createAsyncThunk<TProject, TProject>('projects/addProjects', async (projectData, {rejectWithValue}) => {
    try {
        const result = await client.post(PROJECTS_URL, projectData);
        return result.data;
    } catch (error) {
        const errorMessage = (error as Error).message || "Невідома помилка мережі.";
        return rejectWithValue(errorMessage);
    }
});*/

const projectsSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        /* resetLoadedStatus: (state) => {
             state.loaded = false;
         },*/
    },
    extraReducers: builder => {
        builder.addCase(getUsersAsync.fulfilled, (state, action) => {
            state.data = action.payload;
        });

        /*builder
            .addCase(addProjectsAsync.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.status = 'idle';
            })
            .addCase(addProjectsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add project';
            })*/
    }
});

// export const { resetLoadedStatus } = projectsSlice.actions;
export default projectsSlice.reducer;