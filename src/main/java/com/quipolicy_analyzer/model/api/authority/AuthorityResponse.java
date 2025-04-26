package com.quipolicy_analyzer.model.api.authority;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AuthorityResponse {

  private Integer authId;
  private String authUsername;
  private String authPassword;
  private String authRoles;
  private Integer usuaId;
  private Boolean authIsActive;
  private LocalDateTime authFechaRegistrado;
  private LocalDateTime authFechaModificado;

}
