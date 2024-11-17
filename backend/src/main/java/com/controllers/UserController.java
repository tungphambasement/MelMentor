package com.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.models.EMajor;
import com.models.Resume;
import com.models.User;
import com.payload.ProfileResponseDTO;
import com.payload.ProfileUpdateDTO;
import com.repository.ResumeRepository;
import com.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    Authentication auths;

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserResume(@RequestBody ProfileUpdateDTO profileDTO) {
        System.out.println(profileDTO.getDescription());
        auths = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auths.getName());
        Optional<User> userOptional = userRepository.findByUsername(auths.getName());
        if (userOptional.get() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not find user with username: " + auths.getName());
        }
        User user = userOptional.get();
        Resume curResume = user.getResume();
        Resume resume = new Resume(profileDTO.getSelfImages(), profileDTO.getSeniority(), profileDTO.getDescription(), profileDTO.getExperiences());
        System.out.println(profileDTO.getExperiences().get(0).getOrganization());
        if (curResume != null) {
            Long resumeId = curResume.getId();
            resume.setId(resumeId);
        }
        resumeRepository.save(resume);
        user.setMajor1(EMajor.getEMajor(profileDTO.getMajor1()));
        user.setMajor2(EMajor.getEMajor(profileDTO.getMajor2()));
        user.setResume(resume);
        user.setDescription(profileDTO.getDescription());
        System.out.println();
        return ResponseEntity.ok(userRepository.save(user));
    }

    @RequestMapping("/profile/{id}")
    public Optional<ProfileResponseDTO> getUserProfile(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.get() == null) {
            return null;
        }
        User user = userOptional.get();
        Resume resume = user.getResume();

        ProfileResponseDTO profileResponseDTO = new ProfileResponseDTO(
                user.getUsername(),
                user.getEmail(),
                user.getMajor1(),
                user.getMajor2(),
                resume != null ? resume.getSelfImages() : null,
                resume != null ? resume.getSeniority() : null,
                user.getDescription(),
                resume != null ? resume.getExperiences() : null);
        return Optional.of(profileResponseDTO);
    }

    @RequestMapping("/profiles")
    public List<ProfileResponseDTO> getAllProfile() {
        List<User> users = userRepository.findAll();
        List<ProfileResponseDTO> profiles = new ArrayList<>();
        for (User user : users) {
            Resume resume = user.getResume();

            ProfileResponseDTO profileResponseDTO = new ProfileResponseDTO(
                    user.getUsername(),
                    user.getEmail(),
                    user.getMajor1(),
                    user.getMajor2(),
                    resume != null ? resume.getSelfImages() : null,
                    resume != null ? resume.getSeniority() : null,
                    user.getDescription(),
                    resume != null ? resume.getExperiences() : null);

            profiles.add(profileResponseDTO);
        }

        return profiles;
    }
}
