package com.ecommerce.services.models.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarritoDto {
    @NotNull
    private Integer total;
    @NotNull
    private Long productId;
}
