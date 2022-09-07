package com.example.StudentMnServer.controller;

import com.example.StudentMnServer.JWTTokenHelper;
import com.example.StudentMnServer.model.UserEntity;
import com.example.StudentMnServer.repo.UserEntityRepo;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = { "*" })
@RequestMapping("au")
public class AuthenController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserEntityRepo userRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  JWTTokenHelper jWTTokenHelper;

  @PostMapping("/dn")
  public ResponseEntity<?> login(@RequestBody UserEntity authenticationRequest)
      throws InvalidKeySpecException, NoSuchAlgorithmException {

    final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
        authenticationRequest.getUsername(), authenticationRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    User user = (User) authentication.getPrincipal();
    String jwtToken = jWTTokenHelper.generateToken(user.getUsername());

    // LoginResponse response = new LoginResponse();
    Map<String, String> response = new HashMap<>();
    response.put("token", jwtToken);

    return ResponseEntity.ok(response);
  }

}
