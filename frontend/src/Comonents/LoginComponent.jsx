import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../BasicComponents/AuthProvider"

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
            { errorMessage && <div> Please check Your credentials </div>}
            <input type="text" onChange={(event) => (setUsername(event.target.value))}/>
            <input type="password" onChange={(event) => (setPassword(event.target.value))}/>
            <input type="button" value="login"  onClick={verifyCredenials}/>
            <input type="button" value="register" onClick={register}/>
        </div>
    )
}