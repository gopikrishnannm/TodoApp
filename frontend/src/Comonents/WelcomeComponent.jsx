import { Link, useParams } from "react-router-dom"
import '../Css/Common.css';

export default function WelcomeComponent(){

    const {username} = useParams()

    return(
        <div>
            <div>Welcome {username}</div>
            <Link to={`/${username}/todo`}>
                <button> Goto Todo management</button>
            </Link>
            <Link to={`/deleteuser/${username}`}>
                <button>Delete User</button>
            </Link>
        </div>
    )
}