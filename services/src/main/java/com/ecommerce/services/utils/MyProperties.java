package com.ecommerce.services.utils;

import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;

public class MyProperties {
    public final static String APPLICATIONJOSN = "application/json";
    public final static String TEXTENCODER = "utf-8";
    public final static String BEARER = "Bearer ";
    public final static String HEADER = "Authorization";
    public final static SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();
    public final static String AUTHORITIES = "authorities";
}
