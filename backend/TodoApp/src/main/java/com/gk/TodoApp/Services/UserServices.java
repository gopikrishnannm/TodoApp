package com.gk.TodoApp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gk.TodoApp.Model.User;
import com.gk.TodoApp.Repository.UsersRepository;

@Service
public class UserServices {

    @Autowired
    private UsersRepository usersRepository;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public User register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    public List<User> returnUsers(){
        return usersRepository.findAll();
    }

}
