import axios from 'axios'

const apiClientWithAuth = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClientWithAuth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Fetch the latest token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//@GetMapping("/users/{id}/todos")
export const retrieveAllTodoForUser
    = (id) => apiClientWithAuth.get(`/users/${id}/todos`) 

//@GetMapping("/getUserid/{username}")
export const retrieveIdByUsername 
    = (username) => apiClientWithAuth.get(`/getuserid/${username}`)

//@DeleteMapping("/users/{userid}/todos/{todoid}")
export const deleteTodoForUser 
    = (userid, todoid) => apiClientWithAuth.delete(`/users/${userid}/todos/${todoid}`) 

///users/{userid}/todos/{todoid}
export const retrieveSpecificTodoForUser 
    = (userid, todoid) => apiClientWithAuth.get(`/users/${userid}/todos/${todoid}`)

//@PutMapping("/users/{userid}/todos/{todoid}")
export const updateTodoForUser 
    = (userid, todoid, todo) => apiClientWithAuth.put(`/users/${userid}/todos/${todoid}`, todo)

//@PostMapping("/users/{id}/todos")
export const createTodoForUser 
= (userid, todo) => apiClientWithAuth.post(`/users/${userid}/todos`, todo)

//@PostMapping("/deleteUser/{username}")
export const deleteUser 
    = (username) => apiClientWithAuth.post(`/deleteUser/${username}`)

export default  apiClientWithAuth