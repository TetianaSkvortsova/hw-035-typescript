import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import type {TasksState, TTask, TTaskRequestData} from "../../types/types.ts";

const initialState: TasksState = {
    data: [],
    status: '',
    error: null,
};

const API_URL = import.meta.env.VITE_API_KEY;
const TASKS_URL = `${API_URL}/tasks`;
const client = axios.create({
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc2NDc3MzMyMywiZXhwIjoyMTI0NzY5NzIzfQ.IUe_KrOhq2ALzsx_pnSPLJiBiRftHmTnXc2bXpI3TIg'
    }
});

export const getTasksAsync = createAsyncThunk('tasks/getTasks', async () => {
    const result = await client.get(TASKS_URL);
    return result.data;
});

export const addTaskAsync = createAsyncThunk<TTask, TTaskRequestData>('tasks/addTask', async (taskData: TTaskRequestData, {rejectWithValue}) => {
    try {
        const result = await client.post(TASKS_URL, taskData);
        return result.data;
    } catch (error) {
        const errorMessage = (error as Error).message || "Error";
        return rejectWithValue(errorMessage);
    }
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
    name: 'tasks',
    initialState,
    reducers: {
        /* resetLoadedStatus: (state) => {
             state.loaded = false;
         },*/
    },
    extraReducers: builder => {
        builder.addCase(getTasksAsync.fulfilled, (state, action) => {
            state.data = action.payload;
        });

        builder
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.status = 'idle';
            })
            .addCase(addTaskAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add project';
            })
    }
});

// export const { resetLoadedStatus } = projectsSlice.actions;
export default projectsSlice.reducer;