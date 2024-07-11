package com.ecommerce.services.services.imp;

import com.ecommerce.services.exceptions.MyBadRequestException;
import com.ecommerce.services.exceptions.MyNotFoundException;
import com.ecommerce.services.models.Category;
import com.ecommerce.services.models.Products;
import com.ecommerce.services.models.dtos.AddCategoryDto;
import com.ecommerce.services.models.dtos.ShowCategoriesDto;
import com.ecommerce.services.models.dtos.TotalProductsDto;
import com.ecommerce.services.repositories.CategoryRepository;
import com.ecommerce.services.repositories.ProductRepository;
import com.ecommerce.services.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

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
    @Transactional
    public Category findByName(String name, Pageable pageable) {
        Optional<Category> optionalCategory = categoryRepository.findByName(name);
        Category category = optionalCategory.orElseThrow(() -> {
            throw new MyNotFoundException("No se encontró categoría con ese nombre");
        });
        List<Products> products = productRepository.findByCategory(name, pageable);
        return Category.builder()
                .id(category.getId())
                .name(category.getName())
                .urlImage(category.getUrlImage())
                .products(products).build();
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        categoryRepository.findById(id).ifPresentOrElse(c -> {
            categoryRepository.deleteById(id);
        }, () -> {
            throw new MyNotFoundException("No se encontró categoría a borrar");
        });
    }

    @Override
    @Transactional
    public ShowCategoriesDto editCategory(Long id, AddCategoryDto categoryDto) {
        Category category = categoryRepository.findById(id).orElseThrow(()->{
            throw  new MyBadRequestException("No se puede editar categoría");
        });
        String name = categoryDto.getName();
        String urlImage = categoryDto.getUrlImage();
        category.setUrlImage(urlImage);
        category.setName(name);
        Category cate = categoryRepository.save(category);
        return categoryRepository.findByNameShow(cate.getName()).orElseThrow();
    }

    @Override
    @Transactional
    public TotalProductsDto countProductByCategory(String category) {
        Long count = productRepository.countProductByCategory(category);
        return TotalProductsDto.builder().totalProducts(count).build();
    }
}
