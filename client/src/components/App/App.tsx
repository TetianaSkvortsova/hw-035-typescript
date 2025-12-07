import './App.css'
import Header from "../Header/Header.tsx";
import {BrowserRouter} from "react-router";
import Content from "../Content/Content.tsx";
import {useEffect, useState} from "react";
import {getProjectsAsync} from "../../store/features/projects.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {getTasksAsync} from "../../store/features/tasks.ts";
import {getUsersAsync} from "../../store/features/users.ts";

function App() {
    const dispatch = useAppDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getProjectsAsync());
            dispatch(getTasksAsync());
            dispatch(getUsersAsync());
        }
    }, [dispatch, isAuthenticated]);

    const handleAuthChange = (isAuth: boolean) => {
        setIsAuthenticated(isAuth);
    };

    return (
        <>
            <BrowserRouter>
                <Header onAuthChange={handleAuthChange}/>
                <Content/>
            </BrowserRouter>
        </>
    )
}

export default App
