package com.gk.TodoApp.Config;

public class JwtAuthenticationResponse {

    private String jwt; 
    private String username; 


   
    public JwtAuthenticationResponse(String jwt, String username) {
        this.jwt = jwt;
        this.username = username;
    }

   
    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

   
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    
}
