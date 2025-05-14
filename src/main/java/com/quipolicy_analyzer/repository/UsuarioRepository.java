package com.quipolicy_analyzer.repository;

import com.quipolicy_analyzer.model.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {

  @Query(value = "SELECT u.usua_id AS usuaId, u.usua_nombre AS usuaNombre, u.usua_apellido AS usuaApellido, u.usua_correo AS usuaCorreo, " + "a.auth_roles AS authRoles, a.auth_username AS authUsername, a.auth_password AS authPassword, a.auth_is_active AS authIsActive, a.auth_fecha_registrado AS authFechaRegistrado " + " FROM T_USUARIO u " + "INNER JOIN T_AUTHORITY a ON u.usua_id = a.usua_id", nativeQuery = true)
  List<Map<String, Object>> findAllUsers();


}
