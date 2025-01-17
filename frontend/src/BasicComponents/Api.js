import axios from 'axios'

const token = localStorage.getItem("token")


// const apiClientWithAuth = axios.create({
//     baseURL: 'http://localhost:8080', // Your backend URL
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: token ? `Bearer ${token}` : '', // Add token if it exists
//     },
// })

const apiClientWithAuth = axios.create({
    baseURL: 'http://localhost:8080', // Your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClientWithAuth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Fetch the latest token from localStorage
        console.log('Token being sent:', token); // Add this line for debugging
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const retrieveAllTodoForUser
    = (id) => apiClientWithAuth.get(`/users/${id}/todos`) 


export const retrieveIdByUsername 
    = (username) => apiClientWithAuth.get(`/getuserid/${username}`)


export const deleteTodoForUser 
    = (userid, todoid) => apiClientWithAuth.delete(`/users/${userid}/todos/${todoid}`) 

///users/{id}/todos




export default  apiClientWithAuth