import * as React from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import {useState} from "react";
import type {TProject} from "../../types/types.ts";

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
    const [formData, setFormData] = useState<TProject>(initialState);

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