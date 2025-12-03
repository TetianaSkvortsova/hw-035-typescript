import './App.css'
import Header from "../Header/Header.tsx";
import {BrowserRouter} from "react-router";
import Content from "../Content/Content.tsx";

function App() {

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
