import Projects from "../../components/Projects/Projects.tsx";
import {Button, Stack} from "@mui/material";
import {useAppDispatch} from "../../store/hooks.ts";
import {useEffect, useState} from "react";
import {getProjectsAsync} from "../../store/features/projects.ts";
import NewProjectModal from "../../components/NewProjectModal/NewProjectModal.tsx";

function ProjectsPage() {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getProjectsAsync());
    }, [dispatch]);

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
                >Add Project</Button>
            </Stack>
            <Projects />
            <NewProjectModal open={open} onClose={handleClose}/>
        </>
    );
}

export default ProjectsPage;