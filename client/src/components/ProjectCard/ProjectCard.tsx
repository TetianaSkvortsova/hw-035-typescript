import PriorityLabel from "../PriorityLabel/PriorityLabel.tsx";
import "./ProjectCard.scss";
import type {TProject} from "../../types/types.ts";
// import ActionMenu from "../ActionMenu/ActionMenu.tsx";

function ProjectCard({title, priority, description}: TProject) {
    return (
        <div className='ProjectCard'>
            {/*<ActionMenu onEdit={handleEditProject}*/}
            {/*            onDelete={() => setOpenConfirm(true)}/>*/}
            {/*<ActionMenu />*/}
            <h3>{title}</h3>
            <PriorityLabel priority={priority}/>
            <p>
                {description}
            </p>
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

export default ProjectCard;