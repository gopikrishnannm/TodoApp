package com.gk.TodoApp.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/check")
    public String returnString(){
        return "working";
    }

}
