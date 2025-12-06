import * as React from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import {useEffect, useState} from "react";
import type {TProject} from "../../types/types.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {getProjectByIdAsync, setCurrentProject} from '../../store/features/projects.ts';

type NewProjectFormProps = {
    onSubmitSuccess: (formData: TProject) => void;
};

const initialState: TProject = {
    title: '',
    description: '',
    priority: 'MEDIUM',
}

const priorities: TProject['priority'][] = ['HIGH', 'MEDIUM', 'LOW',];

export default function NewProjectForm({ onSubmitSuccess }: NewProjectFormProps) {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<TProject>(initialState);
    const activeAction = useAppSelector(state => state.projects.activeAction);
    const projectId = useAppSelector(state => state.projects.currentProjectId);
    const projectData = useAppSelector(state => state.projects.currentProject);

    useEffect(() => {
        if (activeAction === 'EDIT' && projectId !== null) {
            if (!projectData || projectData.id !== projectId) {
                dispatch(getProjectByIdAsync(projectId));
            }
        } else {
            setFormData(initialState);
        }
    }, [activeAction, projectId, dispatch, projectData]);

    useEffect(() => {
        if (activeAction === 'EDIT' && projectData && projectData.id === projectId) {
            // const { user_full_name, ...taskWithoutFullName } = projectData;
            setFormData(projectData);
        }
    }, [activeAction, projectId, projectData]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmitSuccess(formData);
        setFormData(initialState);
        dispatch(setCurrentProject(null));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 400,
                margin: '40px auto',
                gap: 3
            }}
        >
            <TextField
                label="Назва Проєкту"
                variant="outlined"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
            />

            <TextField
                label="Опис"
                variant="outlined"
                multiline
                rows={4}
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
            />

            <TextField
                select
                label="Пріоритет"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
            >
                {priorities.map((priority) => (
                    <MenuItem key={priority} value={priority}>
                        {priority}
                    </MenuItem>
                ))}
            </TextField>

            <Button
                type="submit"
                variant="contained"
                size="large"
            >
                Create Project
            </Button>
        </Box>
    );
}