package com.quipolicy_analyzer.model.api.usuario.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Usua_auth_Request {

  /*ATRIBUTOS DEL USUARIO*/
  private Integer usuaId;
  private String usuaNombre;
  private String usuaApellido;
  private String usuaCorreo;

  /*ATRIBUTOS DEL AUTHORITY*/
  private Integer authId;
  private String authUsername;
  private String authPassword;
  private String authRoles;
  private Boolean authIsActive;

  public Usua_auth_Request(Integer usuaId, String usuaNombre, String usuaApellido, String usuaCorreo, String authUsername, String authPassword, String authRoles, Boolean authIsActive) {
  this.usuaId = usuaId;
  this.usuaNombre = usuaNombre;
  this.usuaApellido = usuaApellido;
  this.usuaCorreo = usuaCorreo;
  this.authUsername = authUsername;
  this.authPassword = authPassword;
  this.authRoles = authRoles;
  this.authIsActive = authIsActive;

  }
}
