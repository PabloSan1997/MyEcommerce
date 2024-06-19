package com.ecommerce.services.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 60, nullable = false)
    private String name;
    @Column(nullable = false)
    private Double price;
    @Column(name = "in_stock", nullable = false)
    private Boolean inStock;
    @Column(name="url_image", nullable = false, length = 1000)
    private String urlImage;
    @Column(name = "create_at")
    private Date createAt;
    @Column(name = "update_At")
    private Date updateAt;

    @ManyToOne()
    @JoinColumn(name = "id_category")
    @JsonIgnoreProperties({"products"})
    private Category category;

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Carrito> carritos;

    @OneToOne(mappedBy = "products", cascade = CascadeType.ALL, orphanRemoval = true)
    private ProductDescription productDescription;

    @PrePersist
    public void prePersist(){
        createAt = new Date();
        updateAt = new Date();
        inStock = true;
    }
    @PreUpdate
    public void preUpdate(){
        updateAt = new Date();
    }
}
