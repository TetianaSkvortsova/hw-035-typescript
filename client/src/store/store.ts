import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./features/projects";
import tasksReducer from "./features/tasks";
import usersReducer from "./features/users";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;