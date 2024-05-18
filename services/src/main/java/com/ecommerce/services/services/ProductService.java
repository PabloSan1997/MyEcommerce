package com.ecommerce.services.services;

import com.ecommerce.services.models.Products;
import com.ecommerce.services.models.dtos.AddProductDto;
import com.ecommerce.services.models.dtos.EditProductDto;
import com.ecommerce.services.models.dtos.ShowProductDto;

import java.util.List;

public interface ProductService {
    List<ShowProductDto> findAll();
    Products save(AddProductDto addProductDto);
    Products findById(Long id);
    void deleteProduct(Long id);

    Products editProduct(Long id, EditProductDto editProductDto);
}
