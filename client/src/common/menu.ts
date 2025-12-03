import MainPage from "../pages/MainPage/MainPage.tsx";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage.tsx";
import TasksPage from "../pages/TasksPage/TasksPage.tsx";

export type TMenuItem = {
    path: string;
    title: string;
    // Використовуйте React.ComponentType<any> для максимальної гнучкості
    Component: React.ComponentType<any>;
};

export const urls = {
    PROJECTS_URL: '/projects',
    TASK_URL: '/tasks',
};

export const menuItems: TMenuItem[] = [
    {
        path: '/',
        title: 'Main',
        Component: MainPage,
    },
    {
        path: urls.PROJECTS_URL,
        // hideInMenu: true,
        title: 'Projects',
        Component: ProjectsPage,
    },
    {
        path: urls.TASK_URL,
        // hideInMenu: true,
        title: 'Tasks',
        Component: TasksPage
    },
];