package com.ecommerce.services.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorDto {
    private Integer statusCode;
    private String error;
    private String message;

    public Date getDate(){
        return new Date();
    }
}
