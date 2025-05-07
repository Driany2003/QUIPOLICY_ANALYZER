package com.quipolicy_analyzer.expose.web;

import com.quipolicy_analyzer.business.IUsuarioService;
import com.quipolicy_analyzer.model.api.usuario.UsuarioRequest;
import com.quipolicy_analyzer.model.api.usuario.UsuarioResponse;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_Request;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.quipolicy_analyzer.util.funciones.FxComunes;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@Slf4j
public class WUsuarioController {

  @Autowired
  private IUsuarioService usuarioService;

  @PostMapping("/create")
    public ResponseEntity<Usua_auth_Response> create (@RequestBody Usua_auth_Request request){
    FxComunes.printJson("Datos del usuario request: ", request);
    Usua_auth_Response response = usuarioService.create(request);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @GetMapping("/find-by-id/{usuaId}")
  public ResponseEntity<Usua_auth_Response> findById (@PathVariable Integer usuaId ){
    log.info("Controller :: find-by-id :: {}", usuaId);
    Usua_auth_Response response = usuarioService.findById(usuaId);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @GetMapping("/findAll")
  public ResponseEntity<List<Usua_auth_Response>> findAll(){
    log.info("Controller :: findAll");
    List<Usua_auth_Response> response = usuarioService.findAll();
    return new ResponseEntity<>(response,HttpStatus.OK);
  }

  @DeleteMapping("/delete/{usuaId}")
  public ResponseEntity<Usua_auth_Response> delete (@PathVariable Integer usuaId){
    log.info("Controller :: delete :: {}", usuaId);
    Usua_auth_Response response = usuarioService.delete(usuaId);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }


  @PutMapping("/update")
  public ResponseEntity<Usua_auth_Response> update (@RequestBody Usua_auth_Request request){
    log.info("Controller :: update :: {}", request.getUsuaId());
    FxComunes.printJson("Datos del usuario a actualizar request: ", request);
    Usua_auth_Response response = usuarioService.update(request);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
