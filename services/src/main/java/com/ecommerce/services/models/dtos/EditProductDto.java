package com.ecommerce.services.models.dtos;

import com.ecommerce.services.myValidations.ImageLength;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditProductDto {
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

    @NotNull
    @ImageLength
    private List<String> imagenes;
    @NotBlank
    @Size(min = 2, max = 60)
    private String category;
    @NotNull
    private Boolean inStock;
}
