package com.quipolicy_analyzer.model.api.usuario.dto;

import com.quipolicy_analyzer.model.entity.UsuarioEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Usua_auth_Response {

  /*ATRIBUTOS DEL USUARIO*/
  private Integer usuaId;
  private String usuaNombre;
  private String usuaApellido;
  private String usuaCorreo;
  private String usuaTelefono;

  /*ATRIBUTOS DEL AUTHORITY*/
  private Integer authId;
  private String authUsername;
  private String authPassword;
  private String authRoles;
  private Boolean authIsActive;
  private String authFechaRegistrado;

  public Usua_auth_Response(Integer usuaId, String usuaNombre, String usuaApellido, String usuaCorreo, String usuaTelefono, String authUsername, String authPassword, String authRoles, Boolean authIsActive,String authFechaRegistrado) {
  this.usuaId = usuaId;
  this.usuaNombre = usuaNombre;
  this.usuaApellido = usuaApellido;
  this.usuaCorreo = usuaCorreo;
  this.usuaTelefono = usuaTelefono;
  this.authUsername = authUsername;
  this.authPassword = authPassword;
  this.authRoles = authRoles;
  this.authIsActive = authIsActive;
  this.authFechaRegistrado = authFechaRegistrado;
  }
}
