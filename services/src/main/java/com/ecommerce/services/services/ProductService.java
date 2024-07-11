package com.ecommerce.services.services;

import com.ecommerce.services.models.Products;
import com.ecommerce.services.models.dtos.AddProductDto;
import com.ecommerce.services.models.dtos.EditProductDto;
import com.ecommerce.services.models.dtos.ShowProductDto;
import com.ecommerce.services.models.dtos.TotalProductsDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<ShowProductDto> findAll(Pageable pageable);
    Products save(AddProductDto addProductDto);
    Products findById(Long id);
    void deleteProduct(Long id);
    TotalProductsDto countProducts();

    Products editProduct(Long id, EditProductDto editProductDto);
}
