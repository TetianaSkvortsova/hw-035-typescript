import PriorityLabel from "../PriorityLabel/PriorityLabel.tsx";

// function ProjectCard({ priority}) {
function ProjectCard() {
    return (
        <div className='ProjectCard'>
            {/*<ActionMenu onEdit={handleEditProject}*/}
            {/*            onDelete={() => setOpenConfirm(true)}/>*/}
            <h3>Project</h3>
            <PriorityLabel/>
            <p>
                {/*{description}*/}
                Test
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