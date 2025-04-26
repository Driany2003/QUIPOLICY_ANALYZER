package com.quipolicy_analyzer.expose.web;

import com.quipolicy_analyzer.business.IUsuarioService;
import com.quipolicy_analyzer.model.api.usuario.UsuarioRequest;
import com.quipolicy_analyzer.model.api.usuario.UsuarioResponse;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_listar_Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.quipolicy_analyzer.util.funciones.FxComunes;

import java.util.List;

@RestController
@Slf4j
public class WUsuarioController {

  @Autowired
  private IUsuarioService usuarioService;

  @PostMapping("/create")
  public ResponseEntity<UsuarioResponse> create (@RequestBody UsuarioRequest request){
    FxComunes.printJson("Datos del usuario request: ", request);
    UsuarioResponse response = usuarioService.create(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @GetMapping("/find-by-id/{usuaId}")
  public ResponseEntity<UsuarioResponse> findById (@PathVariable Integer usuaId ){
    log.info("Controller :: find-by-id :: {}", usuaId);
    UsuarioResponse response = usuarioService.findById(usuaId);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @GetMapping("/findAll")
  public ResponseEntity<List<Usua_auth_listar_Response>> findAll(){
    log.info("Controller :: findAll");
    List<Usua_auth_listar_Response> response = usuarioService.findAll();
    return new ResponseEntity<>(response,HttpStatus.OK);
  }

  @PostMapping("/delete/{usuaId}")
  public ResponseEntity<UsuarioResponse> delete (@PathVariable Integer usuaId){
    log.info("Controller :: delete :: {}", usuaId);
    UsuarioResponse response = usuarioService.delete(usuaId);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }


  @PostMapping("/update")
  public ResponseEntity<UsuarioResponse> update (@RequestBody UsuarioRequest request){
    log.info("Controller :: update :: {}", request.getUsuaId());
    FxComunes.printJson("Datos del usuario a actualizar request: ", request);
    UsuarioResponse response = usuarioService.update(request);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
