package com.ecommerce.services.services.imp;

import com.ecommerce.services.exceptions.MyBadRequestException;
import com.ecommerce.services.exceptions.MyNotFoundException;
import com.ecommerce.services.models.Category;
import com.ecommerce.services.models.ProductDescription;
import com.ecommerce.services.models.Products;
import com.ecommerce.services.models.dtos.AddProductDto;
import com.ecommerce.services.models.dtos.ShowProductDto;
import com.ecommerce.services.repositories.CategoryRepository;
import com.ecommerce.services.repositories.ProductDescriptionRepository;
import com.ecommerce.services.repositories.ProductRepository;
import com.ecommerce.services.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductDescriptionRepository productDescriptionRepository;

    @Override
    @Transactional
    public List<ShowProductDto> findAll() {
        return productRepository.findAllProducts();
    }

    @Override
    @Transactional
    public Products save(AddProductDto addProductDto) {
        Optional<Category> oCategory = categoryRepository.findByName(addProductDto.getCategory());
        Category category = oCategory.orElseThrow(()->{
            throw new MyBadRequestException("No se encontro categoria");
        });

        Products products = Products.builder()
                .price(addProductDto.getPrice())
                .name(addProductDto.getName())
                .urlImage(addProductDto.getUrlImage())
                .category(category).build();

        ProductDescription productDescription = ProductDescription.builder()
                .description(addProductDto.getDescription())
                .imageOne(addProductDto.getImageOne())
                .imageTwo(addProductDto.getImageTwo())
                .imageThree(addProductDto.getImageThree())
                .products(products)
                .specifications(addProductDto.getSpecifications()).build();

        ProductDescription createDes = productDescriptionRepository.save(productDescription);

        products.setProductDescription(createDes);

        return productRepository.save(products);
    }

    @Override
    @Transactional
    public Products findById(Long id) {
        Optional<Products> oProduct = productRepository.findById(id);
        return oProduct.orElseThrow(()->{
            throw new MyNotFoundException("No se encontro producto");
        });
    }
}
