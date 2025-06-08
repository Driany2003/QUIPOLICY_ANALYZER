package com.quipolicy_analyzer.business;

import com.quipolicy_analyzer.model.api.poliza.ListaPolizaResponse;
import com.quipolicy_analyzer.model.api.poliza.ListaxIdPolizaResponse;
import com.quipolicy_analyzer.model.api.poliza.PolizaActualizada;
import com.quipolicy_analyzer.model.api.poliza.PolizaResponse;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.File;
import java.util.List;

public interface IPoliticaService {


  Mono<PolizaResponse> listarPoliticas();
  Mono<String>valiarPolitica(MultipartFile pdfFile, String politicaSeleccionada, Integer usuId);
  Mono<List<ListaPolizaResponse>> listarValidaciones();
  Mono<List<ListaxIdPolizaResponse>> listarHistorialxId(Integer usuId);
  Mono<PolizaActualizada> actualizarEstado(String id, String usuId, String status);
}
