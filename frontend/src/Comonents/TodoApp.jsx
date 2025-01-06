import LoginComponent from "./Comonents/LoginComponent";
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import WelcomeComponent from "./Comonents/WelcomeComponent";
import ErrorComponent from "./Comonents/ErrorComponent";
import TodoComponent from "./Comonents/TodoComponent";
import HeaderComponent from "./Comonents/HeaderComponent";


export default function TodoApp(){
    return(
                <div className="App">
        <BrowserRouter>
        <HeaderComponent/>
        <Routes>

            <Route path="/" element={<LoginComponent/>}/>
            <Route path="/welcome" element={<WelcomeComponent/>}/>
            <Route path="/todo" element={<TodoComponent/>}/>
            <Route path="*" element={<ErrorComponent/>}/>
        
            



        </Routes>

        </BrowserRouter>

        </div>

    )
} 
