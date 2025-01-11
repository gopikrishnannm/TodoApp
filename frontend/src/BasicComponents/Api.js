import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL : 'http://localhost:8080'
    }

)

// export function retrieveAllTodoForUser(id){
//     apiClient.get(`/users/${id}/todos`)
// }

///http://localhost:8080/users/1/todos
export const retrieveAllTodoForUser
    = (userid) => apiClient.get(`/users/${userid}/todos`)



export const loginUser = async (username, password) => {

    const user = {username,password}
    try{ 
        const response = await apiClient.post('/login', user);
        return response.data.jwt; // token and username
    }catch(error){

        throw error;
    }


};