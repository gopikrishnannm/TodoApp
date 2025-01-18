import LoginComponent from "./LoginComponent";
import {BrowserRouter, Route, Router, Routes, Navigate} from 'react-router-dom';
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import TodoComponent from "./TodoComponent";
import HeaderComponent from './HeaderComponentt'
import AuthProvider, { useAuth } from "../BasicComponents/AuthProvider";
import UpdateTodoComponent from "./UpdateTodoComponent";


function AuthenticatedRoute({children}){
    
    const authContext = useAuth()
    if(authContext.authenticated){
        return children
    }
    return <Navigate to = "/"/>
    
}


export default function TodoApp(){
    return(
        <div className="App">

            <AuthProvider>

            <BrowserRouter>
            {/* <HeaderComponent/> */}
            <Routes>

                <Route path="/" element={<LoginComponent/>}/>
                <Route path="/welcome/:username" element={
                    
                    <AuthenticatedRoute>
                        <WelcomeComponent/>
                    </AuthenticatedRoute>

                    
                    
                    }/>
                <Route path="/:username/todo" element={
                    <AuthenticatedRoute>
                        <TodoComponent/>
                    </AuthenticatedRoute>
                    
                    
                    }/>

                <Route path="/todo/:todoid" element={
                    <AuthenticatedRoute>
                    <UpdateTodoComponent/>
                </AuthenticatedRoute>

                }/>
                <Route path="*" element={<ErrorComponent/>}/>
                <Route path="/header" element={<HeaderComponent/>}/>
            
                



            </Routes>

            </BrowserRouter>

            </AuthProvider>

        </div>

    )
} 
