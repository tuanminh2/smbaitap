package com.example.StudentMnServer.controller;

import com.example.StudentMnServer.model.UserEntity;
import com.example.StudentMnServer.repo.UserEntityRepo;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import javax.xml.bind.DatatypeConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = { "*" })
@RequestMapping("/user")
public class UserController {

  @Autowired
  private UserEntityRepo userRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @GetMapping("")
  public List<UserEntity> test() {
    return userRepo.findAll();
  }


  @PostMapping("/add")
  public ResponseEntity<UserEntity> add(@RequestBody UserEntity newUser) {
    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
    UserEntity savedUser = userRepo.save(newUser);
    return new ResponseEntity<>(savedUser, HttpStatus.OK);
  }

}
