package com.quipolicy_analyzer.model.api.poliza;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ListaPolizaResponse {
  private String id;
  private String usu_id;
  private String nombre;
  private Comparacion comparacion;
  private Resumen resumen;
  private String fecha_proceso;
  private String status;
  @Getter
  @Setter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Comparacion {
    private List<Diferencia> diferencias;
    private List<Object> cumplimientos; // o define una clase si sabes su estructura
  }
  @Getter
  @Setter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Diferencia {
    private String resultado;
    private String gravedad;
    private String descripcion;
    private String evidencia;
    private String documento;
    private double similaridad;
  }
  @Getter
  @Setter
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Resumen {
    private int total_fragmentos;
    private int diferencias_detectadas;
    private int cumplimientos_detectados;
    private int criticas;
    private int advertencias;
    private int menores;
  }
}
