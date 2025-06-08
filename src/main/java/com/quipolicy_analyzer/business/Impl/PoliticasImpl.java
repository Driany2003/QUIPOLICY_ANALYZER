package com.quipolicy_analyzer.business.Impl;

import com.quipolicy_analyzer.business.IPoliticaService;
import com.quipolicy_analyzer.model.api.poliza.ListaPolizaResponse;
import com.quipolicy_analyzer.model.api.poliza.ListaxIdPolizaResponse;
import com.quipolicy_analyzer.model.api.poliza.PolizaActualizada;
import com.quipolicy_analyzer.model.api.poliza.PolizaResponse;
import com.quipolicy_analyzer.util.funciones.FxComunes;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PoliticasImpl implements IPoliticaService {

  private final WebClient.Builder webClientBuilder;
  private  WebClient webClient;

  // Inicializa el WebClient solo una vez
  @PostConstruct
  public void init() {
    this.webClient = webClientBuilder.baseUrl("https://5bff-38-25-29-232.ngrok-free.app").build(); // build sirve para hacer funcional ese objeto webClient para solicitudes HTTPS
  }


  @Override
  public Mono<PolizaResponse> listarPoliticas() {
    return webClient.get()
        .uri("/listar-politicas")
        .header("X-API-TOKEN", "secreto-super-seguro")
        .retrieve()
        .bodyToMono(PolizaResponse.class)
        .doOnSuccess(response -> {})
        .onErrorResume(e -> {
          FxComunes.printJson("Error al obtener políticas: ", e.getMessage());
          return Mono.empty();
        });
  }

  @Override
  public Mono<List<ListaxIdPolizaResponse>> listarHistorialxId(Integer usuId) {
     return webClient.post()
        .uri("/listar-todo/usuario")
        .header("X-API-TOKEN", "secreto-super-seguro")
        .body(BodyInserters.fromFormData("usu_id", usuId.toString()))  // Aquí va en form-data
        .retrieve()
        .bodyToMono(ListaxIdPolizaResponse[].class)
        .map(Arrays::asList)
        .doOnSuccess(response -> FxComunes.printJson("Políticas obtenidas: Impl ", response))
        .onErrorResume(e -> {
          FxComunes.printJson("Error al obtener políticas: ", e.getMessage());
          return Mono.empty();
        });
  }


  @Override
  public Mono<List<ListaPolizaResponse>> listarValidaciones() {
    return webClient.get()
        .uri("/listar-todo")
        .header("X-API-TOKEN", "secreto-super-seguro")
        .retrieve()
        .bodyToMono(ListaPolizaResponse[].class)  // Cambia a arreglo
        .map(Arrays::asList)                 // Convierte arreglo a lista
        .doOnSuccess(response -> FxComunes.printJson("Políticas obtenidas: Impl ", response))
        .onErrorResume(e -> {
          FxComunes.printJson("Error al obtener políticas: ", e.getMessage());
          return Mono.empty();
        });
  }



  @Override
  public Mono<String> valiarPolitica(MultipartFile multipartFile, String politicaSeleccionada, Integer usuId) {
    try {
      File tempFile = File.createTempFile("upload-", ".pdf");
      multipartFile.transferTo(tempFile);

      MultipartBodyBuilder builder = new MultipartBodyBuilder();
      builder.part("file", new FileSystemResource(tempFile))
          .header("Content-Disposition", "form-data; name=file; filename=" + multipartFile.getOriginalFilename());
      builder.part("politicas", politicaSeleccionada);
      builder.part("usu_id", usuId);

      MultiValueMap<String, HttpEntity<?>> multipartData = builder.build();

      return webClient.post()
          .uri("/analizar")
          .header("X-API-TOKEN", "secreto-super-seguro")
          .contentType(MediaType.MULTIPART_FORM_DATA)
          .body(BodyInserters.fromMultipartData(multipartData))
          .retrieve()
          .bodyToMono(String.class)
          .doFinally(signal -> {
            // Borrar el archivo temporal después de la petición
            if (tempFile.exists()) {
              tempFile.delete();
            }
          })
          .onErrorResume(e -> Mono.just("Error al cargar políticas: " + e.getMessage()));

    } catch (IOException e) {
      return Mono.just("Error creando archivo temporal: " + e.getMessage());
    }
  }

  @Override
  public Mono<PolizaActualizada> actualizarEstado(String id, String usuId, String status) {
    return webClient.put()
        .uri("/actualizar")
        .header("X-API-TOKEN", "secreto-super-seguro")
        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
        .body(BodyInserters.fromFormData("id", id)
            .with("usu_id", usuId)
            .with("status", status))
        .retrieve()
        .bodyToMono(PolizaActualizada.class)
        .doOnSuccess(response -> FxComunes.printJson("Respuesta actualizarEstado: ", response))
        .onErrorResume(e -> {
          FxComunes.printJson("Error actualizarEstado: ", e.getMessage());
          return Mono.empty();
        });
  }


}
