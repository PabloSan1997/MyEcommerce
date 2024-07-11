package com.ecommerce.services.security;

import com.ecommerce.services.security.filter.AuthenticationFilter;
import com.ecommerce.services.security.filter.ValidationJwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    AuthenticationManager getAuthenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/user/register").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/user/generateRoles").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/user/carrito").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/user/carrito/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.GET,
                                "/api/user/carrito",
                                "/api/user/info", "/api/product",
                                "/api/product/{id}", "/api/category",
                                "/api/product/count", "/api/category/count",
                                "/api/category/name",
                                "/api/user/view").hasRole("USER")
                        .requestMatchers(HttpMethod.PATCH, "/api/user/carrito/{id}").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/api/category", "/api/product").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/category/{id}", "/api/product/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/category/{id}", "/api/product/{id}").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .addFilter(new AuthenticationFilter(getAuthenticationManager()))
                .addFilter(new ValidationJwtFilter(getAuthenticationManager()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
