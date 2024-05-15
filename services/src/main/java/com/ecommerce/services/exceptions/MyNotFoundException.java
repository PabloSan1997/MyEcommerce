package com.ecommerce.services.exceptions;

public class MyNotFoundException extends RuntimeException{
    public MyNotFoundException(String message){
        super(message);
    }
}
