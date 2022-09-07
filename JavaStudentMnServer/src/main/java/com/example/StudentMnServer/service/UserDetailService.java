package com.example.StudentMnServer.service;

import com.example.StudentMnServer.model.CustomUser;
import com.example.StudentMnServer.model.UserEntity;
import com.example.StudentMnServer.repo.UserEntityRepo;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service
public class UserDetailService implements UserDetailsService {

  @Autowired
  private UserEntityRepo repo;

  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {

     
      
    UserEntity acc =  repo.findByUsername(username).get();

    Set<SimpleGrantedAuthority> setAuthorities = new HashSet<>();

    setAuthorities.add(new SimpleGrantedAuthority("ROLEUSER"));

    return new CustomUser(acc.getUsername(), acc.getPassword(), setAuthorities);
  }
}
