package com.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.models.ERole;
import com.models.Role;
import com.models.User;
import com.payload.JwtResponse;
import com.payload.UserLoginDTO;
import com.payload.UserRegistrationDTO;
import com.repository.UserRepository;
import com.security.jwt.JwtUtils;
import com.security.services.UserDetailsImpl;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    PasswordEncoder passEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDTO registerDTO){
        User newUser = new User(registerDTO.getUsername(),passEncoder.encode(registerDTO.getPassword()),registerDTO.getEmail());
        if(userRepository.existsByUsername(newUser.getUsername())){
            return ResponseEntity.badRequest().body("Username already exists by username: " + newUser.getUsername());
        }
        if(userRepository.existsByEmail(newUser.getEmail())){
            return ResponseEntity.badRequest().body("Email already exists by email: " + newUser.getEmail());
        }
        //System.out.println(newUser.getUsername());
        Set<Role> roles = new HashSet<>();
        roles.add(new Role(ERole.ROLE_USER));
        newUser.setRoles(roles);
        
        return ResponseEntity.ok(userRepository.save(newUser));
    }

    @RequestMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserLoginDTO loginDTO){
        Authentication auths = authManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(auths);

        String jwtToken = jwtUtils.generateJwtToken(auths);

        UserDetailsImpl userDetails = (UserDetailsImpl) auths.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream().map(item->item.getAuthority()).collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwtToken,userDetails.getId(),userDetails.getUsername(),userDetails.getEmail(), roles));
    }

}
