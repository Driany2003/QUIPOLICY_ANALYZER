package com.quipolicy_analyzer.business;

import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_Request;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_Response;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface IUsuarioService {

  Usua_auth_Response create(Usua_auth_Request request);

  Usua_auth_Response delete(Integer usuaId);

  Usua_auth_Response findById(Integer usuaId);

  Usua_auth_Response update(Usua_auth_Request request);

  List<Usua_auth_Response> findAll();
}
