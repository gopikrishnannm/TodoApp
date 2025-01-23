import { useContext } from "react"
import { AuthContext, useAuth } from "../BasicComponents/AuthProvider"
import { Link, useLocation } from "react-router-dom"
import '../Css/StyleWelcomeComponent.css'

function HeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.authenticated
    const location = useLocation()
    const username = localStorage.getItem("username")

    function logout(){
        authContext.logout()
    }
    
    return (

        <div className="header">

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
                {(location.pathname.startsWith(`/todo`) || location.pathname.startsWith(`/deleteuser`) ) && <Link to={`/welcome/${username}`}>Home Page</Link>}
            </div>

            <div>
                {(location.pathname.startsWith(`/todo`) || location.pathname.startsWith(`/deleteuser`) )&& <Link to={`/${username}/todo`}>Todo Page</Link>}
            </div>

            <div>
                {isAuthenticated &&  location.pathname !== "/" && <div><button onClick={logout}>Logout</button></div>}
            </div>  

        </div>
    )
}

export default HeaderComponent
