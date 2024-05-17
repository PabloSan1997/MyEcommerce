package com.ecommerce.services.services.imp;

import com.ecommerce.services.exceptions.MyBadRequestException;
import com.ecommerce.services.exceptions.MyNotFoundException;
import com.ecommerce.services.models.Carrito;
import com.ecommerce.services.models.Products;
import com.ecommerce.services.models.UserEntity;
import com.ecommerce.services.models.dtos.AddCarritoDto;
import com.ecommerce.services.models.dtos.EditCarritoDto;
import com.ecommerce.services.repositories.CarritoRepository;
import com.ecommerce.services.repositories.ProductRepository;
import com.ecommerce.services.repositories.UserRepository;
import com.ecommerce.services.services.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CarritoServiceImp implements CarritoService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CarritoRepository carritoRepository;


    @Override
    public List<Carrito> findCarritoByEmailUser(String email) {
        return carritoRepository.findByEmailUser(email);
    }

    @Override
    public Carrito save(String email, AddCarritoDto addCarritoDto) {
        Long idProduct = addCarritoDto.getProductId();
        Integer total = addCarritoDto.getTotal();
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new MyBadRequestException("No se encontro usuario");
        });
        Products products = productRepository.findById(idProduct).orElseThrow(() -> {
            throw new MyBadRequestException("No se encontro producto");
        });
        Carrito carrito = Carrito.builder()
                .price(products.getPrice())
                .user(userEntity)
                .products(products)
                .total(total).build();

        return carritoRepository.save(carrito);
    }

    @Override
    public void delete(Long id) {
        carritoRepository.findById(id).ifPresentOrElse(carrito -> {
            carritoRepository.deleteById(carrito.getId());
        }, () -> {
            throw new MyBadRequestException("No se encontro carrito");
        });
    }

    @Override
    public Carrito update(String email, Long id, EditCarritoDto editCarritoDto) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new MyBadRequestException("No se encontro usuario");
        });
        Carrito carrito = carritoRepository.findById(id).orElseThrow(() -> {
            throw new MyNotFoundException("No se encontró elemento");
        });
        if (!Objects.equals(carrito.getUser().getEmail(), userEntity.getEmail()))
            throw new MyBadRequestException("No tienes permiso para esta accion");
        carrito.setTotal(editCarritoDto.getTotal());
        return carritoRepository.save(carrito);
    }
}
