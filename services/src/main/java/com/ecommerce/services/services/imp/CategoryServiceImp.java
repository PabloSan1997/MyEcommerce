package com.ecommerce.services.services.imp;

import com.ecommerce.services.exceptions.MyBadRequestException;
import com.ecommerce.services.exceptions.MyNotFoundException;
import com.ecommerce.services.models.Category;
import com.ecommerce.services.models.dtos.AddCategoryDto;
import com.ecommerce.services.models.dtos.ShowCategoriesDto;
import com.ecommerce.services.repositories.CategoryRepository;
import com.ecommerce.services.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Category save(AddCategoryDto categoryDto) {
        Optional<Category> oCategory = categoryRepository.findByName(categoryDto.getName());
        if (oCategory.isPresent()) throw new MyBadRequestException("Categoría ya existente");
        Category category = Category.builder()
                .name(categoryDto.getName())
                .urlImage(categoryDto.getUrlImage()).build();

        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public List<ShowCategoriesDto> findAll() {
        return categoryRepository.findAllCategories();
    }

    @Override
    public Category findByName(String name) {
        Optional<Category> optionalCategory = categoryRepository.findByName(name);
        return optionalCategory.orElseThrow(()->{
            throw new MyNotFoundException("No se encontró categoría con ese nombre");
        });
    }
}
