package com.quipolicy_analyzer.expose.web;

import com.quipolicy_analyzer.business.IUsuarioService;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_Response;
import com.quipolicy_analyzer.util.funciones.FxComunes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class WLoginController {

  @Autowired
  private IUsuarioService usuarioService;

  @RequestMapping(value = {"/login", "/"}, method = RequestMethod.GET)
  public String login() {
    return "login";
  }

  @RequestMapping(value = {"/quipolicy/menu/validar/consolidar-firmass"}, method = RequestMethod.GET)
  public String welcome(ModelMap model, Authentication authentication, HttpServletRequest request) {
    String username = authentication.getName();
    usuarioService.findUsuarioByAuthUsername(username, request);
    request.getSession().setAttribute("username", username);
    request.getSession().getAttribute("usuSessionNivel");
    model.addAttribute("username", username);
    return "consolidar-firmas";
  }

  @RequestMapping(value = {"/index"}, method = RequestMethod.GET)
  public String index() {
    return "index";
  }

  @RequestMapping(value = {"/logout"}, method = RequestMethod.GET)
  public String logout(ModelMap model, HttpServletRequest request, HttpServletResponse response) {

    return "login";
  }

}
