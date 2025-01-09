import { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}){

    const [authenticated, setAuthenticated] = useState(false);


    function login(username, password){
        if(username === 'gk' && password === 'gk'){
            setAuthenticated(true)
            return true
        }

        else{
            setAuthenticated(false)
            return false
        }
    }


    function logout(){
        setAuthenticated(false)
    }


    return(

        <AuthContext.Provider value={{authenticated, setAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>


    )

    


}