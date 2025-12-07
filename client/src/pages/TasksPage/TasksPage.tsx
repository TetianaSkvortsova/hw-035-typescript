import {Button, Stack} from "@mui/material";
import {useState} from "react";
import Tasks from "../../components/Tasks/Tasks.tsx";
import NewTaskModal from "../../components/NewTaskModal/NewTaskModal.tsx";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog.tsx";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {deleteTaskAsync, setCurrentTask} from "../../store/features/tasks.ts";
import TaskFilter from "../../components/TaskFilter/TaskFilter.tsx";

function TasksPage() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const currentTaskId = useAppSelector(state => state.tasks.currentTaskId);
    const activeAction = useAppSelector(state => state.tasks.activeAction);

    const openConfirmDialog = activeAction === 'DELETE';
    const openModalMode = activeAction === 'EDIT';

    const handleClose = () => {
        setOpen(false);
        dispatch(setCurrentTask(null));
    }

    const handleOpenCreate = () => {
        setOpen(true);
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
                width: 'fit-content',
                marginRight: '0'
            }}>
                <TaskFilter />
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