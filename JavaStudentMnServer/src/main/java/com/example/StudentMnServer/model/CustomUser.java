package com.example.StudentMnServer.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUser extends User {

  public CustomUser(
    String username,
    String password,
    Collection<? extends GrantedAuthority> authorities
  ) {
    super(username, password, authorities);
  }
}
