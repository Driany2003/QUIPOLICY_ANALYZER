package com.quipolicy_analyzer.expose.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/quipolicy/menu")
public class WMenuController {

  //aca se colocara todos las url posibles con lo que se interactua en el sistema.
  @RequestMapping(value = {"/administracion/usuarios"}, method = RequestMethod.GET)
  public String menuUsuarios() {
    return "usuarios";
  }

  @RequestMapping(value = {"/consolidar-firmas"}, method = RequestMethod.GET)
  public String menuConsolidarFirmas() {
    return "consolidar-firmas";
  }

  @RequestMapping(value = {"/cargar-documento"}, method = RequestMethod.GET)
  public String menuCargarDocumento() {
    return "cargar-documento";
  }

  @RequestMapping(value = {"/historial-analisis"}, method = RequestMethod.GET)
  public String menuHistorialAnalisis() {
    return "historial-analisis";
  }
  @RequestMapping(value = {"/reporte/log"}, method = RequestMethod.GET)
  public String menuLog() {
    return "log";
  }
}