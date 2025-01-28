import LoginComponent from "./LoginComponent";
import {BrowserRouter, Route, Router, Routes, Navigate, useLocation} from 'react-router-dom';
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import TodoComponent from "./TodoComponent";
import HeaderComponent from './HeaderComponentt'
import AuthProvider, { useAuth } from "../BasicComponents/AuthProvider";
import UpdateTodoComponent from "./UpdateTodoComponent";
import RegisterComponent from "./RegisterComponent";
import DeleteUserComponent from "./DeleteUserComponent";

function AuthenticatedRoute({children}){

    const authContext = useAuth()
    if(authContext.authenticated){
        return children
    }
    return <Navigate to = "/"/>
}

function AppHeader(){
    const location = useLocation()
    const hideHeaderPath=['/', '/register']

    if(hideHeaderPath.includes(location.pathname)){
        return null;
    }
    return <HeaderComponent/>

}


export default function TodoApp(){
    return(
        <div className="App">

            <AuthProvider>

                <BrowserRouter>
                    <AppHeader/>
                    <Routes>
                        <Route path="/" element={<LoginComponent/>}/>
                        <Route path="/register" element={<RegisterComponent/>}/>

                        <Route path="/welcome/:username" element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path="/deleteuser/:username" element={
                            <AuthenticatedRoute>
                                <DeleteUserComponent/>
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
