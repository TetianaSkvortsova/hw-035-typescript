import PriorityLabel from "../PriorityLabel/PriorityLabel.tsx";
import "./TaskCard.scss";
import type {TTask} from "../../types/types.ts";
import StatusLabel from "../StatusLabel/StatusLabel.tsx";
import ActionMenu from "../ActionMenu/ActionMenu.tsx";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog.tsx";
import {useState} from "react";
import {deleteTaskAsync} from "../../store/features/tasks.ts";
import {useAppDispatch} from "../../store/hooks.ts";

function TaskCard({id, title, priority, description, status, user_full_name}: TTask) {
    const dispatch = useAppDispatch();
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleTaskDelete = () => {
        setOpenConfirm(false);
        dispatch(deleteTaskAsync(id));
    }

    const handleEditTask = () => {
        console.log("Edit task"); //ToDo Edit task
    }

    return (
        <div className='TaskCard'>
            <ActionMenu onEdit={handleEditTask} setOpenConfirm={setOpenConfirm}/>
            <h3>{title}</h3>
            <PriorityLabel priority={priority}/>
            <p>
                {description}
            </p>
            <div className="TaskCard__footer">
                <StatusLabel status={status} />
                <span className="TaskCard__footer__name">{user_full_name}</span>
            </div>

            <ConfirmationDialog
                open={openConfirm}
                onClose={setOpenConfirm}
                onConfirm={handleTaskDelete}
                title={"Confirm Task Deletion"}
                description={"Are you sure you want to permanently delete this task? This action cannot be undone."}
                confirmText="Delete Task"
            />
        </div>
    );
}

export default TaskCard;