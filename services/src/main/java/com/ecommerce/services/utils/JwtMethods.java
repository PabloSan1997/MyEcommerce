package com.ecommerce.services.utils;
import com.ecommerce.services.models.dtos.TokenResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

import static com.ecommerce.services.utils.MyProperties.*;

public class JwtMethods {
    public String generateToken(String username, String authorities)  {
        Claims claims = Jwts.claims()
                .add("username", username)
                .add(AUTHORITIES, authorities).build();
        return Jwts.builder()
                .subject(username)
                .claims(claims)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000*60*60))
                .signWith(SECRET_KEY)
                .compact();
    }
    public TokenResponseDto decodeToken(String token) throws IOException {
        Claims claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload();
        String username = (String) claims.get("username");
        Collection<? extends GrantedAuthority> authorities = Arrays.asList(
                new ObjectMapper()
                        .addMixIn(SimpleGrantedAuthority.class, GrantedAuthorityJson.class)
                        .readValue(claims.get(AUTHORITIES).toString().getBytes(), SimpleGrantedAuthority[].class));
        return TokenResponseDto.builder().authorities(authorities).username(username).build();
    }
}
