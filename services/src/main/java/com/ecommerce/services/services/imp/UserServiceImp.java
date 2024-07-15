package com.ecommerce.services.services.imp;

import com.ecommerce.services.exceptions.MyBadImplementationException;
import com.ecommerce.services.exceptions.MyBadRequestException;
import com.ecommerce.services.exceptions.MyNotFoundException;
import com.ecommerce.services.models.RoleEntity;
import com.ecommerce.services.models.UserEntity;
import com.ecommerce.services.models.dtos.RegisterDto;
import com.ecommerce.services.models.dtos.UserInfoDto;
import com.ecommerce.services.models.dtos.ViewAdminDto;
import com.ecommerce.services.repositories.RoleRepository;
import com.ecommerce.services.repositories.UserRepository;
import com.ecommerce.services.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
    private String adminUsername;
    @Value("${admin.password}")
    private String adminPassword;
    @Value("${admin.nickname}")
    private String adminNickname;

    @Override
    @Transactional
    public UserEntity register(RegisterDto registerDto) {
        Optional<RoleEntity> oRole = roleRepository.findByName("USER");
        RoleEntity role = oRole.orElseThrow(()->{
            throw new MyBadImplementationException();
        });
        Optional<UserEntity> oUser = userRepository.findByEmail(registerDto.getEmail());
        if(oUser.isPresent()) throw new MyBadRequestException("Email ya registrado");
        String email = registerDto.getEmail();
        String name = registerDto.getName();
        String passwordHash = passwordEncoder.encode(registerDto.getPassword());
        UserEntity userEntity = UserEntity.builder()
                .name(name).email(email).password(passwordHash).build();
        userEntity.addRole(role);
        return userRepository.save(userEntity);
    }

    @Override
    @Transactional
    public UserInfoDto findUser(String email) {
        Optional<UserInfoDto> userInfoDto = userRepository.findInfo(email);
        if(userInfoDto.isEmpty()) throw new MyNotFoundException("No se encontro usuario");
        return userInfoDto.get();
    }

    @Override
    @Transactional
    public ViewAdminDto viewAdmin(String username) {
        UserEntity user = userRepository.findByEmail(username).orElseThrow(()->{
            throw new MyNotFoundException("No se encontro usuario");
        });
        List<RoleEntity> role = user.getRoles();
        Optional<RoleEntity> theRole = role.stream().filter(r -> r.getName().equals("ADMIN")).findFirst();
        return ViewAdminDto.builder().isAdmin(theRole.isPresent()).build();
    }

    @Override
    @Transactional
    public void generateRoles() {
        List<RoleEntity> roles = new ArrayList<>();

        if(roleRepository.findByName("USER").isEmpty()){
            RoleEntity rol = RoleEntity.builder().name("USER").build();
            roles.add(rol);
        }
        if(roleRepository.findByName("ADMIN").isEmpty()){
            RoleEntity rol = RoleEntity.builder().name("ADMIN").build();
            roles.add(rol);
        }

        if(roles.size()>0)
            roleRepository.saveAll(roles);

        UserEntity admin = register(
                RegisterDto.builder()
                        .email(adminUsername)
                        .name(adminNickname)
                        .password(adminPassword).build()
        );
        RoleEntity adminRole = roleRepository.findByName("ADMIN").get();
        admin.addRole(adminRole);
        userRepository.save(admin);
    }
}
