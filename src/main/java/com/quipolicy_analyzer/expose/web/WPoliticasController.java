package com.quipolicy_analyzer.expose.web;

import com.quipolicy_analyzer.business.IPoliticaService;
import com.quipolicy_analyzer.model.api.poliza.ListaPolizaResponse;
import com.quipolicy_analyzer.model.api.poliza.ListaxIdPolizaResponse;
import com.quipolicy_analyzer.model.api.poliza.PolizaActualizada;
import com.quipolicy_analyzer.model.api.poliza.PolizaResponse;
import com.quipolicy_analyzer.util.funciones.FxComunes;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/politicas")
@Slf4j
public class WPoliticasController {

  @Autowired
  private IPoliticaService politicaService;

  @PostMapping("/agregar-nueva-politica")
  public Mono<String> agregarNuevaPolitica(@RequestParam("file") MultipartFile nuevoArchivo) {
    return politicaService.agregarNuevaPolitica(nuevoArchivo);
  }

  @GetMapping("/listar-politicas")
  public Mono<ResponseEntity<PolizaResponse>> obtenerPoliticas() {
    log.info("Llegando a listar políticas");
    return politicaService.listarPoliticas()
        .map(polizaResponse -> ResponseEntity.ok(polizaResponse))
        .defaultIfEmpty(ResponseEntity.notFound().build());
  }

  @PostMapping("/validar-politica")
  public Mono<ResponseEntity<String>> validarPolitica(
      @RequestPart("file") MultipartFile file,
      @RequestParam("politicaSeleccionada") String politicaSeleccionada,
      @RequestParam("usuId") Integer usuId) {

    return politicaService.valiarPolitica(file, politicaSeleccionada, usuId)
        .map(polizaResponse -> ResponseEntity.ok(polizaResponse))
        .defaultIfEmpty(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en la carga"));
  }

  @GetMapping("/listar-validaciones")
  public Mono<ResponseEntity<List<ListaPolizaResponse>>> listarValidaciones() {
    return politicaService.listarValidaciones()
        .map(ListaPolizaResponse -> ResponseEntity.ok(ListaPolizaResponse))
        .defaultIfEmpty(ResponseEntity.noContent().build());
  }

  @GetMapping("/listar-historial/{usuId}")
  public Mono<ResponseEntity<List<ListaxIdPolizaResponse>>> listarHistorialxId(@PathVariable Integer usuId) {
    return politicaService.listarHistorialxId(usuId)
        .map(listResponse -> ResponseEntity.ok(listResponse))
        .defaultIfEmpty(ResponseEntity.notFound().build());
  }

  @PutMapping("/actualizar-estado")
  public Mono<ResponseEntity<PolizaActualizada>> actualizarEstado(
      @RequestParam String id,
      @RequestParam String usuId,
      @RequestParam String status) {

    return politicaService.actualizarEstado(id, usuId, status)
        .map(PolizaActualizada -> ResponseEntity.ok(PolizaActualizada))
        .defaultIfEmpty(ResponseEntity.noContent().build());
  }

}
