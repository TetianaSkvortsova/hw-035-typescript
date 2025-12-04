import PriorityLabel from "../PriorityLabel/PriorityLabel.tsx";
import "./TaskCard.scss";
import type {TTask} from "../../types/types.ts";
import StatusLabel from "../StatusLabel/StatusLabel.tsx";

function TaskCard({title, priority, description, status, user_full_name}: TTask) {
    console.log(user_full_name);
    return (
        <div className='TaskCard'>
            {/*<ActionMenu onEdit={handleEditProject}*/}
            {/*            onDelete={() => setOpenConfirm(true)}/>*/}
            <h3>{title}</h3>
            <PriorityLabel priority={priority}/>
            <p>
                {description}
            </p>
            <div className="TaskCard__footer">
                <StatusLabel status={status} />
                <span className="TaskCard__footer__name">{user_full_name}</span>
            </div>

            {/*<ConfirmationDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                onConfirm={handleDeleteProject}
                title={"Confirm Project Deletion"}
                description={"Are you sure you want to permanently delete this project? This action cannot be undone."}
                confirmText="Delete Project"
            />*/}
        </div>
    );
}

export default TaskCard;