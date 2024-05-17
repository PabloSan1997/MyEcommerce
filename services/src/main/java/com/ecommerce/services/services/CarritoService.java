package com.ecommerce.services.services;

import com.ecommerce.services.models.Carrito;
import com.ecommerce.services.models.dtos.AddCarritoDto;
import com.ecommerce.services.models.dtos.EditCarritoDto;

import java.util.List;


public interface CarritoService {
    List<Carrito> findCarritoByEmailUser(String email);
    Carrito save(String email, AddCarritoDto addCarritoDto);
    void delete(Long id);
    Carrito update(String email, Long id,EditCarritoDto editCarritoDto);
}
