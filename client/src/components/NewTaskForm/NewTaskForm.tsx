import * as React from 'react';
import {TextField, Button, Box, MenuItem} from '@mui/material';
import {useState} from "react";
import type {ProjectsState, TProject, TTask, TTaskRequestData, TUser, UserState} from "../../types/types.ts";
import {useAppSelector} from "../../store/hooks.ts";

type NewTaskFormProps = {
    onSubmitSuccess: (formData: TTaskRequestData) => void;
};

const initialState: TTaskRequestData = {
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'TODO',
    project_id: '',
    user_id: '',
}

/*INSERT_TASK: `-- insert into tasks (title, description, priority, status, user_id, project_id)
        // values ($1, $2, $3, $4, $5, $6) returning id, title, description, priority, status, user_id, project_id`,*/
const priorities: TTask['priority'][] = ['HIGH', 'MEDIUM', 'LOW',];
const status: TTask['status'][] = ['TODO', 'IN_PROGRESS', 'DONE',];

export default function NewTaskForm({onSubmitSuccess}: NewTaskFormProps) {
    const assignees: UserState = useAppSelector((state) => state.users);
    const projects: ProjectsState = useAppSelector((state) => state.projects);
    const [formData, setFormData] = useState<TTaskRequestData>(initialState);


    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmitSuccess(formData);
        setFormData(initialState);
        console.log(formData);
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
                label="Task name"
                variant="outlined"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
            />

            <TextField
                label="Description"
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
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
            >
                {priorities.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
            >
                {status.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Assignee"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                required
            >
                {assignees.data.map((assignee: TUser) => (
                    <MenuItem key={assignee.id} value={assignee.id}>
                        {assignee.user_full_name}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Projects"
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                required
            >
                {projects.data.map((project: TProject) => (
                    <MenuItem key={project.id} value={project.id}>
                        {project.title}
                    </MenuItem>
                ))}
            </TextField>

            <Button
                type="submit"
                variant="contained"
                size="large"
            >
                Create Task
            </Button>
        </Box>
    );
}