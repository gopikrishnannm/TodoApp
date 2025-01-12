import { useState } from "react"
import {retrieveAllTodoForUser} from '../BasicComponents/Api'




export default function TodoComponent(){

    // const todosa = [
    //     {   
    //         id : "1",
    //         description : "abc",
    //         targetDate : "2024-12-2",
    //         done : "false"
    //     },
    //     {
    //         id : "2",
    //         description : "abc",
    //         targetDate : "2024-12-2",
    //         done : "false"
    //     }
        

    // ]

    const [todos, setTodos] = useState()

    retrieveAllTodoForUser(1)
    .then((response)=>console.log(response))
    .catch((error)=> console.log(error))

    

    // return(
    //     <table>
    //         <thead>
    //             <tr>
    //                 <th>
    //                     ID
    //                 </th>
    //                 <th>
    //                     Description
    //                 </th>
    //                 <th>
    //                     Done
    //                 </th>
    //                 <th>
    //                     TargetDate
    //                 </th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //         {   
    //         todosa.map(

    //                 todo => (
    //                     <tr>
    //                         <td>{todo.id}</td>
    //                         <td>{todo.description}</td>
    //                         <td>{todo.targetDate}</td>
    //                         <td>{todo.done}</td>
    //                     </tr>
                        
    //                 )

    //             )
    //         }

    //         </tbody>
            

    //     </table>
        


    // )
}