package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.models.Resume;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    
}
