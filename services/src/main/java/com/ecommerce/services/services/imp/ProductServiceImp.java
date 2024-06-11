package com.ecommerce.services.services.imp;

import com.ecommerce.services.exceptions.MyBadRequestException;
import com.ecommerce.services.exceptions.MyNotFoundException;
import com.ecommerce.services.models.Category;
import com.ecommerce.services.models.ProductDescription;
import com.ecommerce.services.models.Products;
import com.ecommerce.services.models.dtos.AddProductDto;
import com.ecommerce.services.models.dtos.EditProductDto;
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
        Category category = oCategory.orElseThrow(() -> {
            throw new MyBadRequestException("No se encontro categoria");
        });

        Products products = Products.builder()
                .price(addProductDto.getPrice())
                .name(addProductDto.getName())
                .urlImage(addProductDto.getUrlImage())
                .category(category).build();

        ProductDescription productDescription = ProductDescription.builder()
                .description(addProductDto.getDescription())
                .imagenes(addProductDto.getImagenes())
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
        return oProduct.orElseThrow(() -> {
            throw new MyNotFoundException("No se encontro producto");
        });
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        productRepository.findById(id).ifPresentOrElse(p -> {
            productRepository.deleteById(p.getId());
        }, () -> {
            throw new MyNotFoundException("No se encontró producto a borrar");
        });
    }

    @Override
    @Transactional
    public Products editProduct(Long id, EditProductDto editProductDto) {
        String sCategory = editProductDto.getCategory();

        Category category = categoryRepository.findByName(sCategory).orElseThrow(() -> {
            throw new MyBadRequestException("No se puede editar ese producto");
        });
        Products product = productRepository.findById(id).orElseThrow(() -> {
            throw new MyBadRequestException("No se puede editar ese producto");
        });
        ProductDescription productDescription = productDescriptionRepository.findById(
                product.getProductDescription().getId()
        ).orElseThrow(() -> {
            throw new MyBadRequestException("No se puede editar ese producto");
        });
        String description = editProductDto.getDescription();
        String specifications = editProductDto.getSpecifications();
        List<String> imagenes = editProductDto.getImagenes();
        productDescription.setDescription(description);
        productDescription.setImagenes(imagenes);
        productDescription.setSpecifications(specifications);


        productDescriptionRepository.save(productDescription);

        String name = editProductDto.getName();
        Double price = editProductDto.getPrice();
        Boolean inStock = editProductDto.getInStock();
        String urlImage = editProductDto.getUrlImage();



        product.setName(name);
        product.setPrice(price);
        product.setInStock(inStock);
        product.setUrlImage(urlImage);
        product.setCategory(category);

        return productRepository.save(product);
    }
}
