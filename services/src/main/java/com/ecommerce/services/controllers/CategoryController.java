package com.ecommerce.services.controllers;

import com.ecommerce.services.models.dtos.AddCategoryDto;
import com.ecommerce.services.services.CategoryService;
import com.ecommerce.services.utils.ValidationComponent;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ValidationComponent validationComponent;

    @GetMapping("")
    public ResponseEntity<?> findCategories(){
        var res = categoryService.findAll();
        return ResponseEntity.ok().body(res);
    }
    @GetMapping("/name")
    public ResponseEntity<?> findByName(@RequestParam String category){
        var res = categoryService.findByName(category);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("")
    public ResponseEntity<?> postCategory(@Valid @RequestBody AddCategoryDto addCategoryDto, BindingResult result){
        if(result.hasFieldErrors()){
            validationComponent.validarion(result);
        }
        var res = categoryService.save(addCategoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editCategory(@Valid @RequestBody AddCategoryDto addCategoryDto, BindingResult result, @PathVariable Long id){
        var res = categoryService.editCategory(id, addCategoryDto);
        return ResponseEntity.ok().body(res);
    }
}
