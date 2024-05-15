package com.ecommerce.services.exceptions;

public class MyBadRequestException  extends RuntimeException{
    public MyBadRequestException(String message){
        super(message);
    }
}
