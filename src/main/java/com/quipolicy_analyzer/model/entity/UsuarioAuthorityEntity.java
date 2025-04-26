package com.quipolicy_analyzer.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "T_AUTHORITY")
public class UsuarioAuthorityEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "auth_id")
  private Integer authId;

  @Column(name = "auth_username")
  private String authUsername;

  @Column(name = "auth_password")
  private String authPassword;

  @Column(name = "auth_roles")
  private String authRoles;

  @Column(name = "usua_id")
  private Integer usuaId;

  @Column(name = "auth_is_active")
  private Boolean authIsActive;

  @Column(name = "auth_fecha_registrado")
  private LocalDateTime authFechaRegistrado;

  @Column(name = "auth_fecha_modificado")
  private LocalDateTime authFechaModificado;



}
