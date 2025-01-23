import { useContext } from "react"
import { AuthContext, useAuth } from "../BasicComponents/AuthProvider"
import { Link, useLocation } from "react-router-dom"
import '../Css/StyleHeaderComponent.css'

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

            <div className="header-left">
                {isAuthenticated &&  location.pathname !== "/" && <div>Todo App</div>}
            </div>

            <div className="header-center">
            {(location.pathname.startsWith(`/todo`) || location.pathname.startsWith(`/deleteuser`) ) && <Link to={`/welcome/${username}`}>Home Page</Link>}
                {location.pathname.startsWith(`/${username}/todo`) && <Link to={`/welcome/${username}`}>Home Page</Link>}
                {location.pathname.startsWith(`/welcome/`) && <Link to={`/${username}/todo`}>Todo Page</Link>}
                {(location.pathname.startsWith(`/todo`) || location.pathname.startsWith(`/deleteuser`) )&& <Link to={`/${username}/todo`}>Todo Page</Link>}
            </div>

            <div className="header-right">
                {isAuthenticated &&  location.pathname !== "/" && <button  className="header-button" onClick={logout}>Logout</button>}
            </div>  

        </div>
    )
}

export default HeaderComponent
