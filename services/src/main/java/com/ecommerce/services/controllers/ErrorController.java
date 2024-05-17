package com.ecommerce.services.controllers;

import com.ecommerce.services.exceptions.MyBadImplementationException;
import com.ecommerce.services.exceptions.MyBadRequestException;
import com.ecommerce.services.exceptions.MyNotFoundException;
import com.ecommerce.services.models.dtos.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class ErrorController {

    private ErrorDto generateError(HttpStatus status, Exception e){
        int statusCode = status.value();
        String error = status.getReasonPhrase();
        String message = e.getMessage();
        return ErrorDto.builder()
                .message(message)
                .error(error)
                .statusCode(statusCode).build();
    }

    @ExceptionHandler({
            NoResourceFoundException.class,
            MyNotFoundException.class
    })
    public ResponseEntity<?> notFound(Exception e){
        HttpStatus status = HttpStatus.NOT_FOUND;
        ErrorDto error = generateError(status, e);
        return ResponseEntity.status(status).body(error);
    }

    @ExceptionHandler({
            MyBadRequestException.class,
            MethodArgumentTypeMismatchException.class,
            NullPointerException.class
    })
    public ResponseEntity<?> badRequest(Exception e){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ErrorDto error = generateError(status, e);
        return ResponseEntity.status(status).body(error);
    }
    @ExceptionHandler({
            MyBadImplementationException.class
    })
    public ResponseEntity<?> badImplementation(Exception e){
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ErrorDto error = generateError(status, e);
        return ResponseEntity.status(status).body(error);
    }
}
