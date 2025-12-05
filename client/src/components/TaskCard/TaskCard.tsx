import PriorityLabel from "../PriorityLabel/PriorityLabel.tsx";
import "./TaskCard.scss";
import type {TTask} from "../../types/types.ts";
import StatusLabel from "../StatusLabel/StatusLabel.tsx";
import ActionMenu from "../ActionMenu/ActionMenu.tsx";

function TaskCard({id, title, priority, description, status, user_full_name}: TTask) {
    // const dispatch = useAppDispatch();
    // const [openConfirm, setOpenConfirm] = useState(false);
    // const [openModal, setOpenModal] = useState(false);
    // console.log(id);

    /*const handleTaskDelete = () => {
        setOpenConfirm(false);
        dispatch(deleteTaskAsync(id));
    }*/

   /* const handleEditTask = () => {
        console.log("Edit task"); //ToDo Edit task
        setOpenModal(true);
    }*/

   /* const handleClose = () => {
        console.log('Modal closed');
        setOpenModal(false);
    }*/

    return (
        <div className='TaskCard'>
            <ActionMenu taskId={id}/>
            <h3>{title}</h3>
            <PriorityLabel priority={priority}/>
            <p>
                {description}
            </p>
            <div className="TaskCard__footer">
                <StatusLabel status={status} />
                <span className="TaskCard__footer__name">{user_full_name}</span>
            </div>
        </div>
    );
}

export default TaskCard;