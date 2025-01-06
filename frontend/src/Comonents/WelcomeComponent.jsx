import { Link } from "react-router-dom"

export default function WelcomeComponent(){
    return(

        <Link to='/todo'>

            <button> Goto Todo management</button>

        </Link>

    )
}