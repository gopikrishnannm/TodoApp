package com.gk.TodoApp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gk.TodoApp.Config.JwtAuthenticationResponse;
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

    public int findUserById(String username){
        User user = usersRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User Not Found");
        }
        return user.getId();
    }

    public boolean isUserExist(String username){
        User user = usersRepository.findByUsername(username);
        return user!=null;
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    public ResponseEntity<?> deleteUser(String username){
        User user = usersRepository.findByUsername(username);
        if(user!=null){
            usersRepository.deleteById(user.getId());
            return ResponseEntity.ok("User deleted successfully");
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    public List<User> returnUsers(){
        return usersRepository.findAll();
    }

    public ResponseEntity<?> verify(User user) {
        // creating a authenticaion object and making it authenticated by checking it with 
        // UsernamePasswordAuthenticationToken that is delegating the task to authentication provider(dao)
        Authentication authentication =
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
            
        if(authentication.isAuthenticated()){
            // if authentication object is authenticated then generate jwt token
            User fullUserDetails = usersRepository.findByUsername(user.getUsername());
    
            // Check if user exists and get the user ID
            if (fullUserDetails != null) {
                String jwt = jwtService.generateToken(user.getUsername());
                return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, fullUserDetails.getId(), user.getUsername()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authenticaion failed"); 
    }
}
