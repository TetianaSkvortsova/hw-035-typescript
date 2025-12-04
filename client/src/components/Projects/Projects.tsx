import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProjectCard from "../ProjectCard/ProjectCard.tsx";
import {useAppSelector} from "../../store/hooks.ts";

export type Project = {
    id: number;
    title: string;
    description: string;
    priority: string;
}

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function Projects() {
    const {data: projects} = useAppSelector(state => state.projects);

    return (
        <Box sx={{flexGrow: 1, marginTop: 8}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {projects.map((project: Project) => (
                    <Grid key={project.id} size={{xs: 2, sm: 4, md: 4}}>
                        <Item>
                            <ProjectCard {...project}></ProjectCard>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
