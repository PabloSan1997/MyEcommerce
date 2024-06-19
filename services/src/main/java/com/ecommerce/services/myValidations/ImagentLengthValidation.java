package com.ecommerce.services.myValidations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ImagentLengthValidation implements ConstraintValidator<ImageLength, List<String>> {

    @Override
    public boolean isValid(List<String> value, ConstraintValidatorContext context) {
        for (String url:value) {
            if(url.length()>999) return false;
        }
        return value.size()==3;
    }
}
