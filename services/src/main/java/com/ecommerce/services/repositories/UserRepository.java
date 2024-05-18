package com.ecommerce.services.repositories;

import com.ecommerce.services.models.UserEntity;
import com.ecommerce.services.models.dtos.UserInfoDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    @Query("select new com.ecommerce.services.models.dtos.UserInfoDto (u.email, u.name) from UserEntity u where u.email = ?1")
    Optional<UserInfoDto> findInfo(String email);
}
