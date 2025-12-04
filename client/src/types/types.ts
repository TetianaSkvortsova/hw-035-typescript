export type TProject = {
    id?: number;
    title: string;
    description: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export type ProjectsState = {
    data: TProject[];
    status: string;
    error: string | null;
}