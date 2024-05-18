package com.ecommerce.services.security.filter;

import com.ecommerce.services.models.dtos.ErrorDto;
import com.ecommerce.services.models.dtos.TokenResponseDto;
import com.ecommerce.services.utils.JwtMethods;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import static com.ecommerce.services.utils.MyProperties.*;

import java.io.IOException;
import java.util.Collection;

public class ValidationJwtFilter extends BasicAuthenticationFilter {
    public ValidationJwtFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(HEADER);
        if(header == null || !header.startsWith(BEARER)){
            chain.doFilter(request, response);
            return;
        }
        String token = header.replace(BEARER, "");
        JwtMethods jwtMethods = new JwtMethods();

        try{
            TokenResponseDto responseDto = jwtMethods.decodeToken(token);
            String username = responseDto.getUsername();
            Collection<? extends GrantedAuthority> authorities = responseDto.getAuthorities();

            request.setAttribute("username", username);
            var authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            chain.doFilter(request, response);

        }catch (Exception e){
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ErrorDto errorDto = ErrorDto.builder()
                    .error(status.getReasonPhrase())
                    .statusCode(status.value()).
                    message(e.getMessage()).build();
            String errorText = new ObjectMapper().writeValueAsString(errorDto);
            response.setStatus(status.value());
            response.setContentType(APPLICATIONJOSN);
            response.setCharacterEncoding(TEXTENCODER);
            response.getWriter().write(errorText);
        }
    }
}
