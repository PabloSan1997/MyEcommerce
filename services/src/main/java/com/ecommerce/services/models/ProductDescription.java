package com.ecommerce.services.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name="product_description")
public class ProductDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 500)
    private String description;
    @Column(nullable = false, length = 2000)
    private String specifications;

    @Column(name = "imagenes_url")
    private List<String> imagenes;

    @Column(name = "update_at")
    private Date updateAt;

    @OneToOne
    @JoinColumn(name = "id_product")
    @JsonIgnore
    private Products products;

    @PrePersist
    public void prePersist(){
        updateAt = new Date();
    }
    @PreUpdate
    public void preUpdate(){
        updateAt = new Date();
    }
}
