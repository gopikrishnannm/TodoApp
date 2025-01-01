# TodoApp

## Description
TodoApp is a full-stack application designed to help users manage their daily tasks efficiently. Built with a React frontend and  Spring Boot backend, it offers features like task creation, editing, deletion, and updation.

## Project setup

### Backend 

1. **Dependencies**:
   - Spring Web
   - Spring Security
   - Spring DevTools
   - Spring Data JPA
  
2. **Setup**:
   - Navigate to Backend directory
     ```bash
     cd TodoApp/backend
     ```
   - Run Spring boot application through Vs code
   - The backend is accessible at `http://localhost:8080`

### Frontend

1. ***setup***
   - Navigate to backend directory
     ```bash
     cd ../frontend
     ```
     - Creating react application:
     ```bash
     npm create-reat-app .
     ```
   - Start the React application:
     ```bash
     npm start
     ```
   - The frontend will be accessible at `http://localhost:3000`.
  
# TodoApp Database Setup

This project contains a MySQL database for the Todo application. The database is named `todoapp` and is accessible at `localhost:3306`. It contains a single table called `Users`, which stores user details.

## Database Details

- **Database Name**: `todoapp`
- **Port**: `3306` (Default MySQL port)
- **Table Name**: `Users`

## Table Structure

The `Users` table has the following structure:

| Column Name | Data Type         | Constraints            |                 
|-------------|-------------------|------------------------|
| `id`        | `INT`             | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `userName`  | `VARCHAR(255)`     | `NOT NULL`             |
| `password`  | `VARCHAR(255)`     | `NOT NULL`             |

### SQL Command to Create Table:

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

     
  


