package com.quipolicy_analyzer.model.api.usuario;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UsuarioResponse {
  private Integer usuaId;
  private String usuaNombre;
  private String usuaApellido;
  private String usuaCorreo;
  private LocalDateTime usuaFechaRegistrado;
  private LocalDateTime usuaFechaModificado;

}
