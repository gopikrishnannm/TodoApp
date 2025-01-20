import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../BasicComponents/AuthProvider"
import '../Css/StyleLoginComponent.css';
import '../Css/Common.css';


export default function LoginComponent(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();
     
    async function verifyCredenials(){
        const isAuthenticated = await authContext.login(username, password)
        if(isAuthenticated){
            navigate(`/welcome/${username}`)
        }
        else{
            setErrorMessage(true)
        }
    }

    function register(){
        navigate(`/register`)
    }

    return(
        <div className="container">
            <div className="title">
                <h1>Welcome to the Todo App!</h1>
            </div>
            { errorMessage && <div className="failure-message"> Invalid username or password. Please try again. </div>}
            <div className="input-container">
                <input type="text" id="username" placeholder="username" className="input-field" 
                    onChange={(event) => (setUsername(event.target.value))}/>
                <input type="password" id="password" placeholder="password" className="input-field" 
                    onChange={(event) => (setPassword(event.target.value))}/>
            </div>
            <div className="button-container">
                <input type="button" id="register-button" className="button" value="register" onClick={register}/>
                <input type="button" id="login-button" className="button" value="login"  onClick={verifyCredenials}/>
            </div>
            
        </div>
    )
}