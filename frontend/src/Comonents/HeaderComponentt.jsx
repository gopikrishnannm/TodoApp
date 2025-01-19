import { useContext } from "react"
import { AuthContext, useAuth } from "../BasicComponents/AuthProvider"
import { Link, useLocation } from "react-router-dom"

function HeaderComponent() {

    const authContext = useAuth()
    
    
    const isAuthenticated = authContext.authenticated

    

    

    function logout(){
        authContext.logout()
    }

    const location = useLocation()

    const username = localStorage.getItem("username")



    
    return (

        <div>



        <div>
             {isAuthenticated &&  location.pathname !== "/" && <div>Todo App</div>}

        </div>

        <div>
            {location.pathname.startsWith(`/welcome/`) && <Link to={`/${username}/todo`}>Todo Page</Link>}
        </div>

        <div>
            {location.pathname.startsWith(`/${username}/todo`) && <Link to={`/welcome/${username}`}>Home Page</Link>}
        </div>
        <div>
        {location.pathname.startsWith(`/todo`) && <Link to={`/welcome/${username}`}>Home Page</Link>}
        </div>

        <div>
        {location.pathname.startsWith(`/todo`) && <Link to={`/${username}/todo`}>Todo Page</Link>}
        </div>
        <div>
            {isAuthenticated &&  location.pathname !== "/" && <div><button onClick={logout}>Logout</button></div>}
        </div>  

        </div>

       
    )
}

export default HeaderComponent
