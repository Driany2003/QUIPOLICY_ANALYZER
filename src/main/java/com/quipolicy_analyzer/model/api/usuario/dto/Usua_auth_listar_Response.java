package com.quipolicy_analyzer.model.api.usuario.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Usua_auth_listar_Response {

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
}
