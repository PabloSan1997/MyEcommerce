package com.ecommerce.services.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCategoryDto {
    @Size(max = 60, min = 2)
    @NotBlank
    private String name;
    @NotBlank
    @Size(max = 1000)
    private String urlImage;
}
