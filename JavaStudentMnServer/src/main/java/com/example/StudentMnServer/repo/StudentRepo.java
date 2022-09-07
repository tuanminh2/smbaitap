package com.example.StudentMnServer.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.StudentMnServer.model.Student;
import com.example.StudentMnServer.model.UserEntity;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {

     Student findByName(String name);
}
