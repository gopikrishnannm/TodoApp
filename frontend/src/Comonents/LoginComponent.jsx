import { useState } from "react"

export default function LoginComponent(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState(false);

    

    function verifyCredenials(username, password){
        if(username == 'gk' && password == 'gk'){
            
        }
        else{
            setErrorMessage(true);
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