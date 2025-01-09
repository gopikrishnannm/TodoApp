import { useContext } from "react"
import { AuthContext, useAuth } from "../BasicComponents/AuthProvider"
function HeaderComponent() {

    const authContext = useAuth()

    console.log(authContext.number+10)
    return (
        
        <div></div>
    )
}

export default HeaderComponent