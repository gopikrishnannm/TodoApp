import { Link, useParams } from "react-router-dom"

export default function WelcomeComponent(){

    const {username} = useParams()

    return(

        <div>

            <div>Welcome {username}</div>

            <Link to='/todo'>



                <button> Goto Todo management</button>

            </Link>
        </div>

        

    )
}