import { useEffect, useState } from "react"
import {retrieveAllTodoForUser, deleteTodoForUser} from '../BasicComponents/Api'
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../BasicComponents/AuthProvider"

export default function TodoComponent(){


    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate()
    const [todos, setTodos] = useState([])

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
        deleteTodoForUser(userid, todoid)
        .then((respone)=> {
            setErrorMessage(true)
            retrieveAllTodos()
        })
        .catch((error)=> console.log(error))
    }

    function updateTodo(todoid){
        navigate(`/todo/${todoid}`)
    }

    // if todo id is -1, create new todo
    function createNewTodo(){
        navigate(`/todo/-1`)
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
                                        <td><button onClick={() => updateTodo(todo.id)}>Update Todo</button></td>
                                    </tr>
                                    
                                )

                            )
                    }

                </tbody>
            </table>
            <button type="button" onClick={createNewTodo}>Create New Todo</button>
        </div>
    )
}