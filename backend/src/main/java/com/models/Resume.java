package com.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "resumes")
public class Resume {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy="resume")
    private User user;

    @OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Image> selfImages;

    @Column(name = "seniority")
    private Integer seniority; 
    
    @Column(name = "description")
    private String description;
    
    @OneToMany(cascade= CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Experience> experiences;


    public Resume(){

    }
        
    public Resume(List<Image> selfImages, Integer seniority, String description, List<Experience> experiences) {
        this.selfImages = selfImages;
        this.seniority = seniority;
        this.description = description;
        this.experiences = experiences;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
}