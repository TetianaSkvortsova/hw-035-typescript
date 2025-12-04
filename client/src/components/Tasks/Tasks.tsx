import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useAppSelector} from "../../store/hooks.ts";
import type {TTask} from "../../types/types.ts";
import TaskCard from "../TaskCard/TaskCard.tsx";

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

export default function Tasks() {
    const {data: tasks} = useAppSelector(state => state.tasks);
    return (
        <Box sx={{flexGrow: 1, marginTop: 8}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {tasks.map((task: TTask) => (
                    <Grid key={task.id} size={{xs: 2, sm: 4, md: 4}}>
                        <Item>
                            <TaskCard {...task}></TaskCard>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
