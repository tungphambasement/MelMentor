package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.models.Experience;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    
}
