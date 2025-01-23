import { Link, useParams } from "react-router-dom"

import '../Css/StyleWelcomeComponent.css'

export default function WelcomeComponent(){

    const {username} = useParams()

    return(
        <div className="welcome-container">
            <div className="welcome-title"><h1>Welcome, {username}!</h1></div>
            <div className="welcome-button-container">
            <Link to={`/deleteuser/${username}`}>
                <button className="delete-button">Delete Your Account</button>
            </Link>
            <Link to={`/${username}/todo`}>
                <button className="todo-button">Manage Your Todo List</button>
            </Link>
            </div>

        </div>
    )
}