import PriorityLabel from "../PriorityLabel/PriorityLabel.tsx";
import "./ProjectCard.scss";
import type {ProjectRequiredId} from "../../types/types.ts";
import ActionMenuProject from "../ActionMenuProject/ActionMenuProject.tsx";

function ProjectCard({id, title, priority, description}: ProjectRequiredId) {
    return (
        <div className='ProjectCard'>
            <ActionMenuProject itemId={id}/>
            <h3>{title}</h3>
            <PriorityLabel priority={priority}/>
            <p>
                {description}
            </p>
        </div>
    );
}

export default ProjectCard;