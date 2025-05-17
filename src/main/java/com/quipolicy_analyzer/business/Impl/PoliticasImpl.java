package com.quipolicy_analyzer.business.Impl;

import com.quipolicy_analyzer.business.IPoliticaService;
import com.quipolicy_analyzer.model.api.poliza.PolizaResponse;
import com.quipolicy_analyzer.util.funciones.FxComunes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class PoliticasImpl implements IPoliticaService {

  private final WebClient.Builder webClientBuilder;

  @Override
  public Mono<PolizaResponse> listarPoliticas() {
    WebClient webClient = webClientBuilder.baseUrl("https://4baf-38-25-29-232.ngrok-free.app").build();

    return webClient.get()
        .uri("/listar-politicas")
        .header("X-API-TOKEN", "secreto-super-seguro")
        .retrieve()
        .bodyToMono(PolizaResponse.class)
        .doOnSuccess(response -> FxComunes.printJson("Políticas obtenidas: Impl ", response))
        .onErrorResume(e -> {
          FxComunes.printJson("Error al obtener políticas: ", e.getMessage());
          return Mono.empty();
        });
  }


  public Mono<String> cargarPoliticas(Object data) {
    WebClient webClient = webClientBuilder.baseUrl("https://9b25-38-25-28-200.ngrok-free.app").build();  // Usa el builder para crear un WebClient

    return webClient.post()
        .uri("/cargar-politicas")
        .bodyValue(data)
        .retrieve()
        .bodyToMono(String.class)
        .onErrorResume(e -> Mono.just("Error al cargar políticas: " + e.getMessage()));
  }

}
