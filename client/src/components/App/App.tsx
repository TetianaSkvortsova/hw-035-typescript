import './App.css'
import Header from "../Header/Header.tsx";
import {BrowserRouter} from "react-router";
import Content from "../Content/Content.tsx";
import {useEffect} from "react";
import {getProjectsAsync} from "../../store/features/projects.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {getTasksAsync} from "../../store/features/tasks.ts";
import {getUsersAsync} from "../../store/features/users.ts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectsAsync());
    dispatch(getTasksAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Content/>
    </BrowserRouter>
    </>
  )
}

export default App
