import { createContext, useContext } from "react";
import { useState } from "react";
import {loginUser} from './Apiforlogin'
import {retrieveIdByUsername} from '../BasicComponents/Api'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}){

    const [authenticated, setAuthenticated] = useState(false);

    // const [userid, setUserid] = useState(10)


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

    async function getUserid(username){
            const userid = await retrieveIdByUsername(username)
            return userid
     }


    return(

        <AuthContext.Provider value={{authenticated, setAuthenticated, login, logout,getUserid}}>
            {children}
        </AuthContext.Provider>


    )

    


}