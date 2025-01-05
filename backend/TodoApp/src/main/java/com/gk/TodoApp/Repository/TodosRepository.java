package com.gk.TodoApp.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gk.TodoApp.Model.Todo;
import com.gk.TodoApp.Model.User;

@Repository
public interface TodosRepository extends JpaRepository<Todo, Integer>{

    List<Todo> findAllByUser(User user);

    boolean existsByUserAndId(User user, int todoId);

    @Modifying
    @Query("DELETE FROM Todo t WHERE t.user = :user AND t.id = :todoid")
    void deleteTodoByUser(@Param("user") User user, @Param("todoid") int todoid);

    Optional<Todo> findByUserAndId(User user, int todoid);




}


