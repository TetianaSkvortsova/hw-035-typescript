import {Dialog, DialogTitle, DialogContent, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import type {TTaskRequestData} from "../../types/types.ts";
import NewTaskForm from "../NewTaskForm/NewTaskForm.tsx";
import {addTaskAsync} from "../../store/features/tasks.ts";

type NewTaskModalProps = {
    open: boolean;
    onClose: () => void;
    // mode: 'EDIT' | 'CREATE';
}

export default function NewTaskModal({open, onClose}: NewTaskModalProps) {
    const dispatch = useAppDispatch();
    const activeAction = useAppSelector(state => state.tasks.activeAction);
    const handleFormSubmit = (formData: TTaskRequestData) => {
            // dispatch(addTaskAsync(formData));
        console.log(activeAction);
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
                Create new task
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
                <NewTaskForm onSubmitSuccess={handleFormSubmit}/>
            </DialogContent>
        </Dialog>
    );
}