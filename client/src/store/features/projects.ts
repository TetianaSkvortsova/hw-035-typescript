import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import type {TProject, ProjectsState, ActiveAction} from "../../types/types.ts";

const initialState: ProjectsState = {
    data: [],
    status: '',
    error: null,
    currentProjectId: null,
    activeAction: null,
    currentProject: null,
};

const API_URL = import.meta.env.VITE_API_KEY;
const PROJECTS_URL = `${API_URL}/projects`;
const client = axios.create({
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc2NDc3MzMyMywiZXhwIjoyMTI0NzY5NzIzfQ.IUe_KrOhq2ALzsx_pnSPLJiBiRftHmTnXc2bXpI3TIg'
    }
});

export const getProjectsAsync = createAsyncThunk('projects/getProjects', async () => {
    const result = await client.get(PROJECTS_URL);
    return result.data;
});

export const addProjectsAsync = createAsyncThunk<TProject, TProject>('projects/addProjects', async (projectData, {rejectWithValue}) => {
    try {
        const result = await client.post(PROJECTS_URL, projectData);
        return result.data;
    } catch (error) {
        const errorMessage = (error as Error).message || "Error.";
        return rejectWithValue(errorMessage);
    }
});

export const deleteProjectAsync = createAsyncThunk('tasks/deleteProject', async (projectId: number, {rejectWithValue}) => {
    try {
        const result = await client.delete(`${PROJECTS_URL}/${projectId}`);
        return result.data.id;
    } catch (error) {
        const errorMessage = (error as Error).message || "Error";
        return rejectWithValue(errorMessage);
    }
});

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setCurrentProject: (state, action: PayloadAction<{id: number, action: ActiveAction} | null>) => {
            if (action.payload) {
                state.currentProjectId = action.payload.id;
                state.activeAction = action.payload.action;
            } else {
                state.currentProjectId = null;
                state.activeAction = null;
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(getProjectsAsync.fulfilled, (state, action) => {
            state.data = action.payload;
        });

        builder
            .addCase(addProjectsAsync.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.status = 'idle';
            })
            .addCase(addProjectsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add project';
            });

        builder
            .addCase(deleteProjectAsync.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.data = state.data.filter(project => project.id !== deletedId);
                state.status = 'idle';
                state.error = null;
            })
            .addCase(deleteProjectAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add project';
            });
    }
});

export const { setCurrentProject } = projectsSlice.actions;
export default projectsSlice.reducer;