package com.gk.TodoApp.Model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="todos")
public class Todo {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String description;
    private LocalDate targetdate;
    private boolean done;

    public Todo(){}

    

    public Todo(String description, boolean done, LocalDate targetdate, User user) {
        this.description = description;
        this.done = done;
        this.targetdate = targetdate;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getTargetdate() {
        return targetdate;
    }

    public boolean isDone() {
        return done;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTargetdate(LocalDate targetdate) {
        this.targetdate = targetdate;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    @Override
    public String toString() {
        return "Todo [id=" + id + ", description=" + description + ", targetdate=" + targetdate + ", done=" + done
                + "]";
    }

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }




}
