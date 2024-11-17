package com.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.models.Resume;
import com.models.User;
import com.payload.ProfileResponseDTO;
import com.payload.ProfileUpdateDTO;
import com.repository.ResumeRepository;
import com.repository.UserRepository;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserResume(@AuthenticationPrincipal UserDetails userDetails, @RequestBody ProfileUpdateDTO profileDTO){
        Optional<User> userOptional = userRepository.findByUsername(userDetails.getUsername());
        if(userOptional.get() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not find user with username: " + userDetails.getUsername());
        } 
        User user = userOptional.get();
        Long resumeId = user.getResume().getId();
        Resume resume = new Resume(profileDTO.getSelfImages(),profileDTO.getSeniority(),profileDTO.getDescription(), profileDTO.getExperiences());
        resume.setId(resumeId);
        resumeRepository.save(resume);
        user.setMajor1(profileDTO.getMajor1());
        user.setMajor2(profileDTO.getMajor2());
        return ResponseEntity.ok(resumeRepository.save(resume));
    }

    @RequestMapping("/profile/{id}")
    public Optional<ProfileResponseDTO> getUserProfile(@PathVariable Long id){
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.get() == null){
            return null;
        } 
        User user = userOptional.get();
        Resume resume = user.getResume();
        ProfileResponseDTO profileResponseDTO = new ProfileResponseDTO(
            user.getUsername(),
            user.getEmail(),
            user.getMajor1(),
            user.getMajor2(),
            resume.getSelfImages(),
            resume.getSeniority(),
            resume.getDescription(),
            resume.getExperiences());
        return Optional.of(profileResponseDTO);
    }
}
