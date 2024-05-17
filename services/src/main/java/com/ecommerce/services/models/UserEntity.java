package com.ecommerce.services.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
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
    @JsonIgnore
    private String password;
    @Column(nullable = false)
    private Boolean enable;
    @Column(name = "create_at")
    private Date createAt;
    @Column(name="update_at")
    private Date updateAt;


    @ManyToMany
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_role"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"id_user", "id_role"})}
    )
    private List<RoleEntity> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Carrito> carritos;

    public UserEntity(){
        roles = new ArrayList<>();
    }
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

    public void addRole(RoleEntity roleEntity){
        if(roles == null){
            roles = new ArrayList<>();
        }
        roles.add(roleEntity);
    }
}
