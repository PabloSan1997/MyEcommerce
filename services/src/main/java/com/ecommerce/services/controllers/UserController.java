package com.ecommerce.services.controllers;

import com.ecommerce.services.models.dtos.AddCarritoDto;
import com.ecommerce.services.models.dtos.EditCarritoDto;
import com.ecommerce.services.models.dtos.RegisterDto;
import com.ecommerce.services.services.CarritoService;
import com.ecommerce.services.services.UserService;
import com.ecommerce.services.utils.ValidationComponent;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private CarritoService carritoService;
    @Autowired
    private ValidationComponent validationComponent;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto, BindingResult result) {
        if (result.hasFieldErrors()) {
            validationComponent.validarion(result);
        }
        var res = userService.register(registerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/info")
    public ResponseEntity<?> findInfo(@RequestAttribute(name = "username") String email){
        var res = userService.findUser(email);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/carrito")
    public ResponseEntity<?> addCarrito(@Valid @RequestBody AddCarritoDto carritoDto, BindingResult result, @RequestAttribute String username) {
        if (result.hasFieldErrors()) {
            validationComponent.validarion(result);
        }
        var res = carritoService.save(username, carritoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/carrito")
    public ResponseEntity<?> getCarrito(@RequestAttribute String username) {
        var res = carritoService.findCarritoByEmailUser(username);
        return ResponseEntity.ok().body(res);
    }

    @PatchMapping("/carrito/{id}")
    public ResponseEntity<?> patchCarrito(@Valid @RequestBody EditCarritoDto editCarritoDto, BindingResult result, @PathVariable Long id, @RequestAttribute String username) {
        if (result.hasFieldErrors()) {
            validationComponent.validarion(result);
        }
        var res = carritoService.update(username, id, editCarritoDto);
        return ResponseEntity.ok().body(res);
    }
    @DeleteMapping("/carrito/{id}")
    public ResponseEntity<?> deleteCarrito(@PathVariable Long id, @RequestAttribute String username) {
        carritoService.delete(username, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/view")
    public ResponseEntity<?> viewAdmin(@RequestAttribute String username){
        var res = userService.viewAdmin(username);
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/generateRoles")
    public ResponseEntity<?> generateRole(){
        Map<String, String> map = new HashMap<>();
        userService.generateRoles();
        map.put("message", "Roles actualizados");
        return ResponseEntity.ok(map);
    }
}
