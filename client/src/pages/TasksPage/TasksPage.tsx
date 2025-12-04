import {Button, Stack} from "@mui/material";
import {useState} from "react";
import Tasks from "../../components/Tasks/Tasks.tsx";
import NewTaskModal from "../../components/NewTaskModal/NewTaskModal.tsx";

function TasksPage() {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = ()=>  {
        setOpen(true);
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
                    onClick={handleOpen}
                >Add Task</Button>
            </Stack>
            <Tasks />
            <NewTaskModal open={open} onClose={handleClose}/>
        </>
    );
}

export default TasksPage;