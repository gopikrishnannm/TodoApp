package com.gk.TodoApp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.gk.TodoApp.Model.Todo;
import com.gk.TodoApp.Model.User;
import com.gk.TodoApp.Repository.TodosRepository;
import com.gk.TodoApp.Repository.UsersRepository;

import jakarta.transaction.Transactional;

@Service
public class TodoServices {

    @Autowired
    private TodosRepository todoRepository;

    @Autowired
    private UsersRepository usersRepository;

    public Todo saveTodoForUser(int userid, Todo todo){
        User user = usersRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        todo.setUser(user);

        return todoRepository.save(todo);

    }
    public List<Todo> retrieveTodoForUser(int userid){

        User user = usersRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
        
        return todoRepository.findAllByUser(user);
    }

    @Transactional
    public ResponseEntity<?> deleteTodoForUser(int userid, int todoid){
        User user = usersRepository.findById(userid)
        .orElseThrow(() -> new RuntimeException("User Not Found"));

        boolean todoExits = todoRepository.existsByUserAndId(user, todoid);

        if(!todoExits){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo item not found for the user");
        }
        
        todoRepository.deleteTodoByUser(user, todoid);

        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<Todo> updateTodo(int userid, int todoid, Todo todo){

        User user = usersRepository.findById(userid)
        .orElseThrow(() -> new RuntimeException("User Not Found"));

        boolean todoExits = todoRepository.existsByUserAndId(user, todoid);

        Todo exisitingTodo = todoRepository.findByUserAndId(user, todoid)
            .orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo Not Found"));


        exisitingTodo.setDescription(todo.getDescription());
        exisitingTodo.setTargetdate(todo.getTargetdate());
        exisitingTodo.setDone(todo.getDone());

        todoRepository.save(exisitingTodo);

        return ResponseEntity.ok(exisitingTodo);


    }





}
