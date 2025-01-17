package com.gk.TodoApp.Config;

public class JwtAuthenticationResponse {

    private String jwt; 
    private String username;
    private int id; 


   
    public JwtAuthenticationResponse(String jwt,int id,  String username) {
        this.jwt = jwt;
        this.id = id;
        this.username = username;
    }

   
    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    
   
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }



    
}
