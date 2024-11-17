package com.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.models.User;
import com.repository.UserRepository;

import jakarta.transaction.Transactional;

//loads user details from database
//bridges spring security's user authentication mechanisms and your application's user data store
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(()->new UsernameNotFoundException("Username not found with username: " + username));

        return UserDetailsImpl.build(user);
    }
}