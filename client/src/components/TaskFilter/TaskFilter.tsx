import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect, useState} from 'react';
import type {TProject} from "../../types/types.ts";
import {getTasksAsync, getTasksByProjectIdAsync} from "../../store/features/tasks.ts";

export default function TaskFilter() {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(state => state.projects.data);
    const [selectedProject, setSelectedProject] = useState<TProject | null>(null);

    useEffect(() => {
        if (selectedProject && selectedProject.id) {
            dispatch(getTasksByProjectIdAsync(selectedProject.id));
        } else {
            dispatch(getTasksAsync());
        }
    }, [dispatch, selectedProject]);

    return (
        <Autocomplete
            disablePortal
            options={projects}
            getOptionLabel={(project) => project.title}
            onChange={(_event, newValue) => {
                setSelectedProject(newValue as TProject | null);
            }}
            value={selectedProject}
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Project"/>}
        />
    );
}