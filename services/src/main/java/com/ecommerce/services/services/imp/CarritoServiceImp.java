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
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public List<Carrito> findCarritoByEmailUser(String email) {
        List<Carrito> carritos = carritoRepository.findByEmailUser(email);
        Iterable<Carrito> aCarrito = carritos.stream().map(c->{
            Double price = c.getProducts().getPrice();
            c.setPrice(price);
            return c;
        }).toList();
        return (List<Carrito>) carritoRepository.saveAll(aCarrito);
    }

    @Override
    @Transactional
    public Carrito save(String email, AddCarritoDto addCarritoDto) {
        Long idProduct = addCarritoDto.getProductId();
        Integer total = addCarritoDto.getTotal();
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new MyBadRequestException("No se encontro usuario");
        });
        Products products = productRepository.findById(idProduct).orElseThrow(() -> {
            throw new MyBadRequestException("No se encontro producto");
        });
        Optional<Carrito> checCarrito = carritoRepository.findBayUserAndProduct(userEntity.getId(), idProduct);
        if(checCarrito.isPresent()) throw new MyBadRequestException("Ya existe carrito con ese producto");
        Carrito carrito = Carrito.builder()
                .price(products.getPrice())
                .user(userEntity)
                .products(products)
                .total(total).build();

        return carritoRepository.save(carrito);
    }

    @Override
    @Transactional
    public void delete(String email, Long id) {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(()->{
            throw new MyBadRequestException("No se encontró usuario");
        });
        Carrito carrito = carritoRepository.findById(id).orElseThrow(() -> {
            throw new MyBadRequestException("No se encontro carrito");
        });
        if(!carrito.getUser().getEmail().equals(userEntity.getEmail())){
            throw new MyBadRequestException("No teienes permiso pra esto");
        }
        carritoRepository.deleteById(carrito.getId());
    }

    @Override
    @Transactional
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
