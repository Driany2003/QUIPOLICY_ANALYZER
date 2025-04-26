package com.quipolicy_analyzer.util.funciones;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;

import java.net.InetAddress;
import java.net.UnknownHostException;

@Slf4j
public class FxComunes {
/*
  public static String getLoggedInUserName() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    if (principal instanceof UserDetails) {
      return ((UserDetails) principal).getUsername();
    }

    return principal.toString();
  }

  */

  public static String sIPAddress() {
    String sIPAddress = "";
    // Se obtiene el nombre del servidor
    try {
      InetAddress address = InetAddress.getLocalHost();
      // Cogemos la IP
      byte[] bIPAddress = address.getAddress();
      // IP en formato String
      for (int x = 0; x < bIPAddress.length; x++) {
        if (x > 0) {
          // A todos los numeros les anteponemos
          // un punto menos al primero
          sIPAddress += ".";
        }
        // Jugamos con los bytes y cambiamos el bit del signo
        sIPAddress += bIPAddress[x] & 255;
      }
    } catch (UnknownHostException e1) {
      log.error(e1.getMessage(), e1);
    }
    return sIPAddress;
  }

  public static String sHostName() {
    String sHostName = "";
    // Se obtiene el nombre del servidor
    try {
      InetAddress address = InetAddress.getLocalHost();
      sHostName = address.getHostName();
    } catch (UnknownHostException e1) {
      log.error(e1.getMessage(), e1);
    }
    return sHostName;
  }

  public static void printJson(String tipo, Object obj) {
    //Creating the ObjectMapper object
    ObjectMapper mapper = new ObjectMapper();
    //Converting the Object to JSONString
    String jsonPrint = "";
    try {
      jsonPrint = mapper.writeValueAsString(obj);
      log.info("{}{}", tipo, jsonPrint);
    } catch (JsonProcessingException e) {
      log.error(e.getMessage(), e);
    }
  }

}
