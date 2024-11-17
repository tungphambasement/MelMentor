package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.models.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findImageByImageLink(String imageLink);
}
