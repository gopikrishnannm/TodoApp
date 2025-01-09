import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useAuth } from "../BasicComponents/AuthProvider"

// import verifyCredenials from '../BasicComponents/SecurityComponent'


export default function LoginComponent(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();

    const authContext = useAuth();  

    function verifyCredenials(){
        if(authContext.login(username, password)){
            navigate('/welcome')

        }

        else{
            setErrorMessage(true)
        }
    }



    return(
        <div className="container">
            { errorMessage && <div> Please check Your credentials </div>}
            <input type="text" onChange={(event) => (setUsername(event.target.value))}/>
            <input type="password" onChange={(event) => (setPassword(event.target.value))}/>
            <input type="button" value="login"  onClick={verifyCredenials}/>
        </div>

    )
}