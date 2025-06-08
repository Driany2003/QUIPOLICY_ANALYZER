package com.quipolicy_analyzer.business.websec;

import com.quipolicy_analyzer.util.funciones.FxComunes;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
    GrantedAuthority authority = authentication.getAuthorities().iterator().next(); //va a capturar el primer rol
    request.getSession().setAttribute("role",authority.getAuthority());

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    Integer usuId = userDetails.getUsuId();
    request.getSession().setAttribute("usuId", usuId);

    response.sendRedirect("/quipolicy/menu/validar/consolidar-firmass");
  }
}
