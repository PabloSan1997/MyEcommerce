package com.ecommerce.services.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "carrito")
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer total;
    private Double price;
    @Column(name = "create_at")
    private Date createAt;
    @Column(name = "update_at")
    private Date updateAt;
    @Column(name = "total_price")
    private Double totalPrice;
    @ManyToOne
    @JoinColumn(name = "id_product")
    @JsonIgnoreProperties({"category", "productDescription", "updateAt"})
    private Products products;
    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonIgnoreProperties({"roles", "enable", "createAt", "updateAt"})
    private UserEntity user;

    @PrePersist
    public void prePersist() {
        updateAt = new Date();
        createAt = new Date();
        totalPrice = price * total;
    }

    @PreUpdate
    public void preUpdate() {
        updateAt = new Date();
        totalPrice = price * total;
    }
}
