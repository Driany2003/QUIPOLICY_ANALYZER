package com.quipolicy_analyzer.model.api.poliza;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PolizaResponse {
  private List<String> politicas;
}
