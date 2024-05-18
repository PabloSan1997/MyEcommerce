package com.ecommerce.services.controllers;

import com.ecommerce.services.models.dtos.AddProductDto;
import com.ecommerce.services.models.dtos.EditProductDto;
import com.ecommerce.services.services.ProductService;
import com.ecommerce.services.utils.ValidationComponent;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ValidationComponent validationComponent;

    @GetMapping("")
    public ResponseEntity<?> findProducts() {
        var res = productService.findAll();
        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        var res = productService.findById(id);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("")
    public ResponseEntity<?> postProduct(@Valid @RequestBody AddProductDto addProductDto, BindingResult result) {
        if (result.hasFieldErrors()) {
            validationComponent.validarion(result);
        }
        var res = productService.save(addProductDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editProduct(@Valid @RequestBody EditProductDto editProductDto, BindingResult result, @PathVariable Long id) {
        if (result.hasFieldErrors()) {
            validationComponent.validarion(result);
        }
        var res = productService.editProduct(id, editProductDto);
        return ResponseEntity.ok().body(res);
    }
}
