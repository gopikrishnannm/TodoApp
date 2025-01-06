export default function TodoComponent(){

    const todos = [
        {   
            id : "1",
            description : "abc",
            targetDate : "2024-12-2",
            done : "false"
        },
        {
            id : "2",
            description : "abc",
            targetDate : "2024-12-2",
            done : "false"
        }
        

    ]

    return(
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                </tr>
            </thead>
            <tbody>
            {   
            todos.map(

                todo => (
                    <tr>
                        <td>{todo.id}</td>
                    </tr>
                    
                )

            )
        }

            </tbody>
            

        </table>
        


    )
}