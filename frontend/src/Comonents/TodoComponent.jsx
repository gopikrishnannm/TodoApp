import { useEffect, useState } from "react"
import {retrieveAllTodoForUser} from '../BasicComponents/Api'
import { useParams } from "react-router-dom"
import { useAuth } from "../BasicComponents/AuthProvider"



 



export default async function TodoComponent(){

    const {username} = useParams()

    const [userid, setUserid] = useState(null)
    
    const auth = useAuth()

    userid = await auth.getUserid(username)

    console.log(userid)

    const [todos, setTodos] = useState([])



    useEffect(()=> {
        retrieveAllTodoForUser(userid)
    .then((response)=>setTodos(response.data))
    .catch((error)=> console.log(error.message))
    },[]
    )

    

    

    return(
        <table>
            <thead>
                <tr>
                    <th>
                        Description
                    </th>
                    <th>
                        Done
                    </th>
                    <th>
                        TargetDate
                    </th>
                </tr>
            </thead>
            <tbody>
            {   
            todos.map(  todo => 
                    (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.targetdate}</td>
                            <td>{todo.done == 1 ? "yes" : "No"}</td>
                        </tr>
                        
                    )

                )
            }

            </tbody>
            

        </table>
        


    )
}