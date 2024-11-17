package com.payload;

import java.util.List;

import com.models.EMajor;
import com.models.Experience;
import com.models.Image;

public class ProfileResponseDTO {
    private String username;
    
    private String email;

    private EMajor major1;

    private EMajor major2;

    private List<Image> selfImages;

    private Integer seniority; 
    
    private String description;
    
    private List<Experience> experiences;

    public ProfileResponseDTO(){
    }

    public ProfileResponseDTO(String username, String email, EMajor major1, EMajor major2, List<Image> selfImages,
            Integer seniority, String description, List<Experience> experiences) {
        this.username = username;
        this.email = email;
        this.major1 = major1;
        this.major2 = major2;
        this.selfImages = selfImages;
        this.seniority = seniority;
        this.description = description;
        this.experiences = experiences;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EMajor getMajor1() {
        return major1;
    }

    public void setMajor1(EMajor major1) {
        this.major1 = major1;
    }

    public EMajor getMajor2() {
        return major2;
    }

    public void setMajor2(EMajor major2) {
        this.major2 = major2;
    }

    public List<Image> getSelfImages() {
        return selfImages;
    }

    public void setSelfImages(List<Image> selfImages) {
        this.selfImages = selfImages;
    }

    public Integer getSeniority() {
        return seniority;
    }

    public void setSeniority(Integer seniority) {
        this.seniority = seniority;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }

    
}
