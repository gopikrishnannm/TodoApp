import { createContext, useContext } from "react";
import { useState } from "react";
import {loginUser} from './Apiforlogin'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}){

    const [authenticated, setAuthenticated] = useState(false);


    async function login(username, password){


        try{
            const response = await loginUser(username,password)
            
            if(response){
                const { jwt : token, username } = response.data; 
                console.log("Token recieved",token)
                localStorage.setItem("token", token)
                setAuthenticated(true)
                return true
            }
            else{
                setAuthenticated(false)
                return false
            }
        }

        catch(error){
            console.error('Login failed:', error.response || error.message);
            setAuthenticated(false);
            return false;            
        }
    }


    function logout(){
        localStorage.removeItem('token');
        setAuthenticated(false);
    }


    return(

        <AuthContext.Provider value={{authenticated, setAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>


    )

    


}