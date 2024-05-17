package com.ecommerce.services.services;

import com.ecommerce.services.models.UserEntity;
import com.ecommerce.services.models.dtos.RegisterDto;

public interface UserService {
    UserEntity register(RegisterDto registerDto);
}
