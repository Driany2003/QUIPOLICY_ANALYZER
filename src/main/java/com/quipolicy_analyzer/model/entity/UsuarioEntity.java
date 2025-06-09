package com.quipolicy_analyzer.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "T_USUARIO" )
public class UsuarioEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "usua_id")
  private Integer usuaId;

  @Column(name = "usua_nombre")
  private String usuaNombre;

  @Column(name = "usua_apellido")
  private String usuaApellido;

  @Column(name = "usua_correo")
  private String usuaCorreo;

  @Column(name = "usua_telefono")
  private String usuaTelefono;

  @Column(name = "usua_fecha_registrado")
  private LocalDateTime usuaFechaRegistrado;

  @Column(name = "usua_fecha_modificado")
  private LocalDateTime usuaFechaModificado;


}
