package com.ecommerce.services.repositories;

import com.ecommerce.services.models.Carrito;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarritoRepository extends CrudRepository<Carrito, Long> {

    @Query("select u from Carrito u where u.user.email = ?1")
    List<Carrito> findByEmailUser(String email);
}
