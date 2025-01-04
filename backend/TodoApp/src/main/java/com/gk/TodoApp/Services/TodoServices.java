package com.gk.TodoApp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    public ResponseEntity<Void> deleteTodoForUser(int userid, int todoid){
        User user = usersRepository.findById(userid)
        .orElseThrow(() -> new RuntimeException("User Not Found"));
        
        todoRepository.deleteTodoByUser(user, todoid);

        return ResponseEntity.noContent().build();
    }



}
