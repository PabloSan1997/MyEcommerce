package com.ecommerce.services.exceptions;

public class MyBadImplementationException extends RuntimeException{
    public MyBadImplementationException(){
        super("Error en el servidor");
    }
}
