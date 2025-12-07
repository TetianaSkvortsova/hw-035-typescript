import Projects from "../../components/Projects/Projects.tsx";
import {Button, Stack} from "@mui/material";
import {useState} from "react";
import NewProjectModal from "../../components/NewProjectModal/NewProjectModal.tsx";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {deleteProjectAsync, setCurrentProject} from "../../store/features/projects.ts";
import {removeTasksByProjectId} from "../../store/features/tasks.ts";

function ProjectsPage() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const currentProjectId = useAppSelector(state => state.projects.currentProjectId);
    const activeAction = useAppSelector(state => state.projects.activeAction);
    const openConfirmDialog = activeAction === 'DELETE'; // <-- Діалог відкритий лише для 'DELETE'
    const openModalMode = activeAction === 'EDIT';

    const handleClose = () => {
        setOpen(false);
        dispatch(setCurrentProject(null));
    }

    const handleOpen = ()=>  {
        setOpen(true);
    }

    const handleCloseConfirm = () => {
        if (currentProjectId !== null) {
            console.log(currentProjectId);
            dispatch(deleteProjectAsync(currentProjectId));
            dispatch(removeTasksByProjectId({projectId: currentProjectId}));
        }
        dispatch(setCurrentProject(null));
    }

    return (
        <>
            <Stack spacing={2} direction="row" sx={{
                mx: 'auto',
                my: 2.5,
                width: 'fit-content',
                marginRight: '0'
            }}>
                <Button
                    variant="contained"
                    size="large"
                    sx={{fontWeight: 700}}
                    onClick={handleOpen}
                >Add Project</Button>
            </Stack>
            <Projects />
            <NewProjectModal open={open} onClose={handleClose}/>
            <NewProjectModal open={openModalMode} onClose={handleClose}/>
            <ConfirmationDialog
                open={openConfirmDialog}
                onClose={handleClose}
                onConfirm={handleCloseConfirm}
                title={"Confirm Project Deletion"}
                description={"Are you sure you want to permanently delete this Project? This action cannot be undone."}
                confirmText="Delete Project"
            />
        </>
    );
}

export default ProjectsPage;