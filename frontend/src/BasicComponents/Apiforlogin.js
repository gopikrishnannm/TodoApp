import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080'
    }

)





export const loginUser = async (username, password) => {

    const user = {username,password}
    try{ 
        const response = await apiClient.post('/login', user);
        console.log(response)
        console.log(response.data.jwt)
        return response; 
    }catch(error){

        throw error;
    }


};


//@GetMapping("/userexits/{username}")
export const isUserExist
    = (username) =>  apiClient.get(`/userexists/${username}`)

//@PostMapping("/register")
export const register
    = (user) => apiClient.post(`/register`, user)

// export function retrieveAllTodoForUser(id){
//     apiClient.get(`/users/${id}/todos`)
// }

///http://localhost:8080/users/1/todos
