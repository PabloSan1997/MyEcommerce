package com.ecommerce.services.services;

import com.ecommerce.services.models.Category;
import com.ecommerce.services.models.dtos.AddCategoryDto;
import com.ecommerce.services.models.dtos.ShowCategoriesDto;
import com.ecommerce.services.models.dtos.TotalProductsDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    Category save(AddCategoryDto categoryDto);
    List<ShowCategoriesDto> findAll();
    Category findByName(String name, Pageable pageable);
    void deleteCategory(Long id);
    ShowCategoriesDto editCategory(Long id, AddCategoryDto categoryDto);
    TotalProductsDto countProductByCategory(String category);
}
