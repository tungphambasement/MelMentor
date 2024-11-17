package com.payload;

import java.util.List;

import com.models.Experience;
import com.models.Image;


public class ProfileUpdateDTO {  
    private List<Image> selfImages;

    private Integer seniority; 
    
    private String description;
    
    private List<Experience> experiences;  
    
    private String major1;

    private String major2;

    public ProfileUpdateDTO(List<Image> selfImages, Integer seniority, String description, List<Experience> experiences,
            String major1, String major2) {
        this.selfImages = selfImages;
        this.seniority = seniority;
        this.description = description;
        this.experiences = experiences;
        this.major1 = major1;
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

    public String getMajor1() {
        return major1;
    }

    public void setMajor1(String major1) {
        this.major1 = major1;
    }

    public String getMajor2() {
        return major2;
    }

    public void setMajor2(String major2) {
        this.major2 = major2;
    }
}
