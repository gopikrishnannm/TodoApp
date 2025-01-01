package com.gk.TodoApp.SecurityServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gk.TodoApp.Model.User;
import com.gk.TodoApp.Repository.UsersRepository;
import com.gk.TodoApp.SecurityModel.UserPrincipal;


@Service
public class CustomUserDetailsService implements  UserDetailsService{

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        User user = usersRepository.findByUsername(username);


        if(user == null){
            throw new UsernameNotFoundException("User Not Found");
        }

        return new UserPrincipal(user);
    }

}
