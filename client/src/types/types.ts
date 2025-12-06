export type TProject = {
    id?: number | null;
    title: string;
    description: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export type ProjectRequiredId = TProject &{
    id: number;
}

export type ProjectsState = {
    data: TProject[];
    status: string;
    error: string | null;
    currentProjectId: number | null,
    activeAction: ActiveAction,
    currentProject: TProject | null,
}

export type TTask = TProject & {
    id: number;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    user_full_name: string;
    user_id: number | undefined | string;
    project_id: number | undefined | string;
    project_name: string;
}

export type TasksState = {
    data: TTask[];
    status: string;
    error: string | null;
    currentTaskId: number | null;
    activeAction: ActiveAction;
    currentTask: TTask | null;
}

export type TUser = {
    id: number | undefined;
    user_full_name: string;
}

export type UserState = {
    data: TUser[];
    status: string;
    error: string | null;
}

export type TTaskRequestData = Omit<TTask, 'project_name' | 'user_full_name'>;
export type ActiveAction = 'EDIT' | 'DELETE' | 'CREATE' | null;

export type ActionMenuProps = {
    itemId: number;
}