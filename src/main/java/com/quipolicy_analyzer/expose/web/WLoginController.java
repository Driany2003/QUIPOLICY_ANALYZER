package com.quipolicy_analyzer.expose.web;


import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class WLoginController {

  @RequestMapping(value = {"/login", "/"}, method = RequestMethod.GET)
  public String login() {
    return "login";
  }

  @RequestMapping(value = {"/quipolicy/menu/validar/consolidar-firmass"}, method = RequestMethod.GET)
  public String welcome(Authentication authentication, HttpServletRequest request) {
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
