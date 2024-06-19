package com.ecommerce.services.myValidations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ImagentLengthValidation.class)
public @interface ImageLength {
    String message() default "Las imagenes tienen que ser tres de máximo 1000 caracteres";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
