package com.ecommerce.services.services;

import com.ecommerce.services.models.Category;
import com.ecommerce.services.models.dtos.AddCategoryDto;
import com.ecommerce.services.models.dtos.ShowCategoriesDto;

import java.util.List;

public interface CategoryService {
    Category save(AddCategoryDto categoryDto);
    List<ShowCategoriesDto> findAll();
    Category findByName(String name);
    void deleteCategory(Long id);
    Category editCategory(Long id, AddCategoryDto categoryDto);
}
