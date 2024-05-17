package com.ecommerce.services.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name="product_description")
public class ProductDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 500)
    private String description;
    @Column(nullable = false, length = 2000)
    private String specifications;
    @Column(nullable = false, name = "url_one")
    private String imageOne;
    @Column(nullable = false, name = "url_two")
    private String imageTwo;
    @Column(nullable = false, name = "url_three")
    private String imageThree;
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
