package com.quipolicy_analyzer.repository;

import com.quipolicy_analyzer.model.entity.UsuarioAuthorityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository  extends JpaRepository<UsuarioAuthorityEntity, Integer> {


}
