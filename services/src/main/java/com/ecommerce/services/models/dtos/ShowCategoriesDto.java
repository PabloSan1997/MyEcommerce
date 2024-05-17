package com.ecommerce.services.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShowCategoriesDto {
    private Long id;
    private String name;
    private String urlImage;
}
