package com.ecommerce.services.utils;

import com.ecommerce.services.exceptions.MyBadRequestException;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.List;

@Component
public class ValidationComponent {
    public void validarion(BindingResult result){
        List<FieldError> fieldErrors = result.getFieldErrors();
        StringBuilder message = new StringBuilder();
        for (FieldError error:fieldErrors) {
            message.append(error.getField())
                    .append(" ")
                    .append(error.getDefaultMessage())
                    .append(". ");
        }
        throw  new MyBadRequestException(message.toString());
    }
}
