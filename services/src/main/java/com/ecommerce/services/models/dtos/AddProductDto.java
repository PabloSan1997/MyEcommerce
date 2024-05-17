package com.ecommerce.services.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddProductDto {
    @Size(min = 2, max = 60)
    @NotBlank
    private String name;
    @NotNull
    private Double price;
    @NotBlank
    private String urlImage;
    @NotBlank
    @Size(min = 2, max=500)
    private String description;
    @NotBlank
    @Size(min = 2, max=2000)
    private String specifications;
    @NotBlank
    private String imageOne;
    @NotBlank
    private String imageTwo;
    @NotBlank
    private String imageThree;
    @NotBlank
    @Size(min = 2, max = 60)
    private String category;
}
