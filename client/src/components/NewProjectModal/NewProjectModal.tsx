// import * as React from 'react';
import {Dialog, DialogTitle, DialogContent, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NewProjectForm from "../NewProjectForm/NewProjectForm.tsx";
import {useAppDispatch} from "../../store/hooks.ts";
import {addProjectsAsync} from "../../store/features/projects.ts";
import type {TProject} from "../../types/types.ts";

type NewProjectModalProps = {
    open: boolean;
    onClose: () => void;
}

export default function NewProjectModal({open, onClose}: NewProjectModalProps) {
    const dispatch = useAppDispatch();
    const handleFormSubmit = (formData: TProject) => {
        dispatch(addProjectsAsync(formData));
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{m: 0, p: 2}}>
                Create new project
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <NewProjectForm onSubmitSuccess={handleFormSubmit}/>
            </DialogContent>
        </Dialog>
    );
}