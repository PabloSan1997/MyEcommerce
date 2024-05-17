package com.ecommerce.services.services;

import com.ecommerce.services.models.Products;
import com.ecommerce.services.models.dtos.AddProductDto;
import com.ecommerce.services.models.dtos.ShowProductDto;

import java.util.List;

public interface ProductService {
    List<ShowProductDto> findAll();
    Products save(AddProductDto addProductDto);
    Products findById(Long id);
}
