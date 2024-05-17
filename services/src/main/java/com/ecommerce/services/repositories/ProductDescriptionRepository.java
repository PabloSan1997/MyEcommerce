package com.ecommerce.services.repositories;

import com.ecommerce.services.models.ProductDescription;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDescriptionRepository extends CrudRepository<ProductDescription, Long> {
}
