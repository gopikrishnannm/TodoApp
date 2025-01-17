import { useEffect, useState } from "react"
import {retrieveAllTodoForUser, deleteTodoForUser} from '../BasicComponents/Api'
import { useParams } from "react-router-dom"
import { useAuth } from "../BasicComponents/AuthProvider"



 



export default function TodoComponent(){

    const {username} = useParams()

    const [userid, setUserid] = useState(null)

    const [errorMessage, setErrorMessage] = useState(false)
    
    const auth = useAuth()

    //userid = await auth.getUserid(username)

    //console.log(userid)

    const [todos, setTodos] = useState([])

    // useEffect(() => {
    //     const fetchUserAndTodos = async () => {
    //         try {
    //             const userIdResponse = await auth.getUserid(username);
    //             setUserid(userIdResponse.data); // Correctly set the state
    //             const todosResponse = await retrieveAllTodoForUser(userIdResponse.data);
    //             setTodos(todosResponse.data);
    //         } catch (error) {
    //             console.error('Error fetching todos:', error.message);
    //         }
    //     };
    //     fetchUserAndTodos();
    // }, [username, auth]); // Dependencies



    

    useEffect(()=> retrieveAllTodos,[])

    function retrieveAllTodos(){
        const userid = localStorage.getItem("userid")
        console.log("user id from todo component ", userid)
        retrieveAllTodoForUser(userid)
        .then((response)=>setTodos(response.data))
    .catch((error)=> console.log(error.message))
    }


    function deleteTodo(todoid){
        const userid = localStorage.getItem("userid")
        console.log("user id for delete todo is " , userid)
        console.log("deleting todo id ". todoid)
        deleteTodoForUser(userid, todoid)
        .then((respone)=> {

            //console.log(respone)
            setErrorMessage(true)
            retrieveAllTodos()

        })
        .catch((error)=> console.log(error))

    }
    

    

    return(
        <div>

            {errorMessage && <div>Todo item has been deleted</div>}
        <table>
            <thead>
                <tr>
                    <th>
                        Description
                    </th>
                    <th>
                        TargetDate
                        
                    </th>
                    <th>
                        Done
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
                            <td><button onClick={()=>deleteTodo(todo.id)}>Delete todo</button></td>
                        </tr>
                        
                    )

                )
            }

            </tbody>
            

        </table>

        </div>
        
        


    )
}