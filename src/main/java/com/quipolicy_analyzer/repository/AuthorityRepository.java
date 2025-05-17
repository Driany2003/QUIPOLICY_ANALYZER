package com.quipolicy_analyzer.repository;

import com.quipolicy_analyzer.model.entity.UsuarioAuthorityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorityRepository  extends JpaRepository<UsuarioAuthorityEntity, Integer> {

  @Query(value = "SELECT * FROM T_AUTHORITY u WHERE u.auth_username = :authUsername", nativeQuery = true)
  Optional<UsuarioAuthorityEntity> findByUsername(@Param("authUsername") String authUsername);

}
