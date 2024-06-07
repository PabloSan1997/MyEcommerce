package com.ecommerce.services.repositories;

import com.ecommerce.services.models.Carrito;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarritoRepository extends CrudRepository<Carrito, Long> {

    @Query("select u from Carrito u where u.user.email = ?1 order by u.id")
    List<Carrito> findByEmailUser(String email);

    @Query("select c from Carrito c where c.user.id = ?1 and c.products.id = ?2")
    Optional<Carrito> findBayUserAndProduct(Long idUser, Long idProduct);
}
