package com.ecommerce.services.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(length = 50, nullable = false)
    private String name;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private Boolean enable;
    @Column(name = "create_at")
    private Date createAt;
    @Column(name="update_at")
    private Date updateAt;

    @PrePersist
    public void prePersist(){
        createAt = new Date();
        updateAt = new Date();
        enable = true;
    }

    @PreUpdate
    public void preUpdate(){
        updateAt = new Date();
    }
}
