package com.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String organizationName;

    @NotBlank
    private String position;

    @NotBlank
    private String briefExperience;
     
    public Experience(){

    }
    
    public Experience(@NotBlank String organizationName, @NotBlank String position, @NotBlank String briefExperience) {
        this.organizationName = organizationName;
        this.position = position;
        this.briefExperience = briefExperience;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getBriefExperience() {
        return briefExperience;
    }

    public void setBriefExperience(String briefExperience) {
        this.briefExperience = briefExperience;
    }

    
}
