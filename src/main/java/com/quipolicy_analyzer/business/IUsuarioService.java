package com.quipolicy_analyzer.business;

import com.quipolicy_analyzer.model.api.usuario.UsuarioRequest;
import com.quipolicy_analyzer.model.api.usuario.UsuarioResponse;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_listar_Response;

import java.util.List;

public interface IUsuarioService {


  UsuarioResponse create (UsuarioRequest request);
  UsuarioResponse delete (Integer usuaId);
  UsuarioResponse findById (Integer usuaId);
  UsuarioResponse  update (UsuarioRequest request);
  List<Usua_auth_listar_Response> findAll ();
}
