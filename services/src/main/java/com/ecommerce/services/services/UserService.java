package com.ecommerce.services.services;

import com.ecommerce.services.models.UserEntity;
import com.ecommerce.services.models.dtos.RegisterDto;
import com.ecommerce.services.models.dtos.UserInfoDto;
import com.ecommerce.services.models.dtos.ViewAdminDto;

public interface UserService {
    UserEntity register(RegisterDto registerDto);
    UserInfoDto findUser(String email);
    ViewAdminDto viewAdmin(String username);
    void generateRoles();
}
