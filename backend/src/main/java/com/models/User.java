package com.models;

import java.util.Date;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users", 
uniqueConstraints={@UniqueConstraint(columnNames = "username"), @UniqueConstraint(columnNames = "email")})
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable=false)
    @NotBlank
    @Size(min=6,max=20)
    private String username;

    @Column(name = "password", nullable=false)
    @NotBlank
    private String password;

    @Column(name = "email", nullable=false)
    @NotBlank
    private String email;

    @Column(name =  "created_at")
    @CreationTimestamp
    private Date createdAt;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name = "user_roles", joinColumns=@JoinColumn(name = "user_id"), inverseJoinColumns=@JoinColumn(name = "role_id"))
    private Set<Role> roles;

    @OneToOne
    @JoinColumn(name = "resume_id", referencedColumnName= "id")
    private Resume resume;

    private String description;
    
    @Enumerated
    private EMajor major1;

    @Enumerated
    private EMajor major2;

    public User(){}

    public User(String username, String password, String email){
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Resume getResume() {
        return resume;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
