package com.gk.TodoApp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gk.TodoApp.Model.User;
import com.gk.TodoApp.Services.UserServices;


@RestController
public class UserController {

    @Autowired
    private UserServices services;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return services.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        // returning jwt token + username
        return services.verify(user);
    }

    @GetMapping("users")
    public List<User> listusers(){
        return services.returnUsers();
    }
}
