package com.ecommerce.services.repositories;

import com.ecommerce.services.models.Category;
import com.ecommerce.services.models.dtos.ShowCategoriesDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    @Query("select new com.ecommerce.services.models.dtos.ShowCategoriesDto(c.id, c.name, c.urlImage) from Category c")
    List<ShowCategoriesDto> findAllCategories();

    Optional<Category> findByName(String name);
}
