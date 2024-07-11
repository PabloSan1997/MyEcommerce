package com.ecommerce.services.repositories;

import com.ecommerce.services.models.Products;
import com.ecommerce.services.models.dtos.ShowProductDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Products, Long> {
    @Query("select new com.ecommerce.services.models.dtos.ShowProductDto(p.id, p.name, p.price, p.inStock, p.urlImage, p.category.name, p.createAt) from Products p order by p.updateAt desc")
    List<ShowProductDto> findAllProducts(Pageable pageable);

    @Query("select p from Products p where p.category.name = ?1 order by p.updateAt desc")
    List<Products> findByCategory(String category, Pageable pageable);

    @Query("select count(p) from Products p")
    Long countProducts();

    @Query("select count(p) from Products p where p.category.name = ?1")
    Long countProductByCategory(String category);
}
