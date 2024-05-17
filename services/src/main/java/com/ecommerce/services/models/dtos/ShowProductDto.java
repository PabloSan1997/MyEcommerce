package com.ecommerce.services.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShowProductDto {
    private Long id;
    private String name;
    private Double price;
    private Boolean inStock;
    private String urlImage;
    private String category;
    private Date createAt;
}
