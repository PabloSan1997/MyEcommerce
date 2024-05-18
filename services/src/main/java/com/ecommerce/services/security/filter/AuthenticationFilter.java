package com.ecommerce.services.security.filter;

import com.ecommerce.services.exceptions.MyBadImplementationException;
import com.ecommerce.services.models.dtos.ErrorDto;
import com.ecommerce.services.models.dtos.LoginRequestDto;
import com.ecommerce.services.models.dtos.LoginResponseDto;
import com.ecommerce.services.utils.JwtMethods;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import static com.ecommerce.services.utils.MyProperties.*;

import java.io.IOException;
import java.util.Collection;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    public AuthenticationFilter(AuthenticationManager authenticationManager){
        this.authenticationManager = authenticationManager;
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = "";
        String password = "";
        try {
            LoginRequestDto loginRequestDto = new ObjectMapper().readValue(request.getInputStream(), LoginRequestDto.class);
            email = loginRequestDto.getEmail();
            password = loginRequestDto.getPassword();
        } catch (IOException e) {
            throw new MyBadImplementationException();
        }
        var authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User) authResult.getPrincipal();
        String username = user.getUsername();
        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
        String authoritiesJson = new ObjectMapper().writeValueAsString(authorities);
        JwtMethods jwtMethods = new JwtMethods();

        String token = jwtMethods.generateToken(username, authoritiesJson);

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .username(username).token(token).build();

        String resLogin = new ObjectMapper().writeValueAsString(loginResponseDto);
        HttpStatus status = HttpStatus.OK;
        response.setStatus(status.value());
        response.setContentType(APPLICATIONJOSN);
        response.setCharacterEncoding(TEXTENCODER);
        response.setHeader(HEADER, BEARER+token);
        response.getWriter().write(resLogin);

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ErrorDto errorDto = ErrorDto.builder()
                .error(status.getReasonPhrase())
                .statusCode(status.value()).
                message("Usuario o contraseña incorrectas").build();
        String errorText = new ObjectMapper().writeValueAsString(errorDto);
        response.setStatus(status.value());
        response.setContentType(APPLICATIONJOSN);
        response.setCharacterEncoding(TEXTENCODER);
        response.getWriter().write(errorText);
    }
}
