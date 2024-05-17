package com.ecommerce.services.models.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterDto {
    @NotBlank
    @Size(min = 2, max = 80)
    @Email
    private String email;
    @Size(min = 2, max = 80)
    @NotBlank
    private String name;
    @NotBlank
    private String password;
}
