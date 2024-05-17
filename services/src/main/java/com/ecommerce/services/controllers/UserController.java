package com.ecommerce.services.controllers;

import com.ecommerce.services.models.dtos.RegisterDto;
import com.ecommerce.services.services.UserService;
import com.ecommerce.services.utils.ValidationComponent;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ValidationComponent validationComponent;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto, BindingResult result){
        if(result.hasFieldErrors()){
            validationComponent.validarion(result);
        }
        var res = userService.register(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }
}
