package com.quipolicy_analyzer.expose.web;

import com.quipolicy_analyzer.business.IPoliticaService;
import com.quipolicy_analyzer.model.api.poliza.PolizaResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@Slf4j
public class WPoliticasController {

  @Autowired
  private IPoliticaService politicaService;

  @GetMapping("/listar-politicas")
  public Mono<ResponseEntity<List<PolizaResponse>>> obtenerPoliticas() {
    return politicaService.listarPoliticas()
        .map(politicas -> ResponseEntity.ok(politicas))
        .defaultIfEmpty(ResponseEntity.notFound().build()); // Si no se obtiene ninguna política, retorna 404
  }

  @PostMapping("/cargar-politicas")
  public Mono<ResponseEntity<String>> cargarPoliticas(@RequestBody Object data) {
    return politicaService.cargarPoliticas(data)
        .map(response -> ResponseEntity.ok(response))  // Si la respuesta es exitosa, devolvemos 200 OK
        .defaultIfEmpty(ResponseEntity.notFound().build());  // Si ocurre un error, devolvemos 500
  }





}
