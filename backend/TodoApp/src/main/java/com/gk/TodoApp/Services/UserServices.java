package com.gk.TodoApp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gk.TodoApp.Model.User;
import com.gk.TodoApp.Repository.UsersRepository;
import com.gk.TodoApp.SecurityServices.JWTService;

@Service
public class UserServices {

    @Autowired
    private UsersRepository usersRepository;


    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
	private JWTService jwtService;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public User register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    public List<User> returnUsers(){
        return usersRepository.findAll();
    }

    public String verify(User user) {
        
        // creating a authenticaion object and making it authenticated by checking it with 
        // UsernamePasswordAuthenticationToken that is delegating the task to authentication provider(dao)
        Authentication authentication =
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        
        // 
        if(authentication.isAuthenticated()){
            // if authentication object is authenticated then generate jwt token
            return jwtService.generateToken(user.getUsername());
        }
        return "fail";
    }

}
