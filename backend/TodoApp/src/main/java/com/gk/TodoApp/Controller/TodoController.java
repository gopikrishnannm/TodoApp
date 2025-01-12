package com.gk.TodoApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gk.TodoApp.Model.Todo;
import com.gk.TodoApp.Services.TodoServices;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TodoController {

    @Autowired
    private TodoServices todoServices;


    @PostMapping("/users/{id}/todos")
    public Todo createTodo(@PathVariable int id, @RequestBody Todo todo){
         return todoServices.saveTodoForUser(id, todo);
    }

    @GetMapping("/users/{id}/todos")
    public List<Todo> retrieveTodo(@PathVariable int id){
        return todoServices.retrieveTodoForUser(id);
    }

    @DeleteMapping("/users/{userid}/todos/{todoid}")
    public ResponseEntity<?> deleteTodo(@PathVariable int userid, @PathVariable int todoid){
       return todoServices.deleteTodoForUser(userid, todoid);

    }
    @PutMapping("/users/{userid}/todos/{todoid}")
    public ResponseEntity<Todo> updateTodo(@PathVariable int userid, @PathVariable int todoid, @RequestBody Todo todo){
        return todoServices.updateTodo(userid, todoid, todo);
    }


}
