package com.example.StudentMnServer.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.StudentMnServer.model.Student;
import com.example.StudentMnServer.repo.StudentRepo;

@RestController
@CrossOrigin(origins = { "*" })
@RequestMapping("/student")
public class StudentController {

  @Autowired
  public StudentRepo studentRepo;

  @GetMapping("")
  public List<Student> getStudents() {
    return studentRepo.findAll();
  }

  @PostMapping("/add")
  public ResponseEntity<Student> addStudent(@RequestBody Student student) {

    Student savedStudent = studentRepo.save(student);

    return new ResponseEntity<>(savedStudent, HttpStatus.OK);
  }


  @PutMapping("/update")
  public ResponseEntity<Student> update(@RequestBody Student student) {
    Student dbStudent = studentRepo.findByName(student.getName());
    dbStudent.setTeams(student.getTeams());
    Student savedStudent = studentRepo.save(dbStudent);
    return new ResponseEntity<>(savedStudent, HttpStatus.OK);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Integer> delete(@PathVariable Integer id) {
    studentRepo.deleteById(id);
    return new ResponseEntity(id, HttpStatus.OK);
  }
}
