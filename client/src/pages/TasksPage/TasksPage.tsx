import {Button, Stack} from "@mui/material";
import {useState} from "react";
import Tasks from "../../components/Tasks/Tasks.tsx";
import NewTaskModal from "../../components/NewTaskModal/NewTaskModal.tsx";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {deleteTaskAsync, setCurrentTask} from "../../store/features/tasks.ts";

function TasksPage() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const currentTaskId = useAppSelector(state => state.tasks.currentTaskId);
    const activeAction = useAppSelector(state => state.tasks.activeAction);
    // const [openNewTaskModal, setOpenNewTaskModal] = useState(false);

    const openConfirmDialog = activeAction === 'DELETE'; // <-- Діалог відкритий лише для 'DELETE'
    const openModalMode = activeAction === 'EDIT';
    if (openModalMode) {
        // setOpen(true);
        console.log(currentTaskId);
    }

    // const openCreateModal = activeAction === 'CREATE';


    const handleClose = () => {
        setOpen(false);
        dispatch(setCurrentTask(null));
        // setOpenNewTaskModal(false);
    }

    const handleOpenCreate = () => {
        setOpen(true);

        // setOpenNewTaskModal(true);
        console.log(currentTaskId);
    }

    const handleCloseConfirm = () => {
        if (currentTaskId !== null) {
            dispatch(deleteTaskAsync(currentTaskId));
        }
        dispatch(setCurrentTask(null));
    }

    return (
        <>
            <Stack spacing={2} direction="row" sx={{
                mx: 'auto',
                my: 2.5,
                width: 'fit-content'
            }}>
                <Button
                    variant="contained"
                    size="large"
                    sx={{fontWeight: 700}}
                    onClick={handleOpenCreate}
                >Add Task</Button>
            </Stack>
            <Tasks/>
            <NewTaskModal open={open} onClose={handleClose}/>
            <NewTaskModal open={openModalMode} onClose={handleClose}/>
            <ConfirmationDialog
                open={openConfirmDialog}
                onClose={handleClose}
                onConfirm={handleCloseConfirm}
                title={"Confirm Task Deletion"}
                description={"Are you sure you want to permanently delete this task? This action cannot be undone."}
                confirmText="Delete Task"
            />
        </>
    );
}

export default TasksPage;