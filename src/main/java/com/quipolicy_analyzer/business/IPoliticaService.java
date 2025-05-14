package com.quipolicy_analyzer.business;

import com.quipolicy_analyzer.model.api.poliza.PolizaResponse;
import reactor.core.publisher.Mono;

import java.util.List;

public interface IPoliticaService {


  Mono<List<PolizaResponse>> listarPoliticas();
  Mono<String> cargarPoliticas(Object data);

}
