package com.quipolicy_analyzer.business.Impl;

import com.quipolicy_analyzer.business.IUsuarioService;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_Request;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_Response;
import com.quipolicy_analyzer.model.entity.UsuarioAuthorityEntity;
import com.quipolicy_analyzer.model.entity.UsuarioEntity;
import com.quipolicy_analyzer.repository.AuthorityRepository;
import com.quipolicy_analyzer.repository.UsuarioRepository;
import com.quipolicy_analyzer.util.funciones.DateUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.quipolicy_analyzer.util.funciones.FxComunes;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioImpl implements IUsuarioService {

  private final UsuarioRepository repository;
  private final AuthorityRepository usuarioAuthorityRepository;

  @Override
  public Usua_auth_Response create(Usua_auth_Request request) {
    log.info("Implements :: create :: {}", request);

    BCryptPasswordEncoder encriptarContrasena = new BCryptPasswordEncoder();
    String contrasenaEncriptada = encriptarContrasena.encode(request.getAuthPassword());

    UsuarioEntity usuarioCreado = convertRequestToEntity(request);
    usuarioCreado.setUsuaFechaRegistrado(LocalDateTime.now());
    UsuarioEntity guardarUsuario = repository.save(usuarioCreado);

    UsuarioAuthorityEntity usuarioAuthorityEntityCreado = new UsuarioAuthorityEntity();
    usuarioAuthorityEntityCreado.setAuthFechaRegistrado(LocalDateTime.now());
    usuarioAuthorityEntityCreado.setAuthIsActive(true);
    usuarioAuthorityEntityCreado.setUsuaId(guardarUsuario.getUsuaId());
    usuarioAuthorityEntityCreado.setAuthPassword(contrasenaEncriptada);
    usuarioAuthorityEntityCreado.setAuthRoles(request.getAuthRoles());
    usuarioAuthorityEntityCreado.setAuthUsername(request.getAuthUsername());
    usuarioAuthorityRepository.save(usuarioAuthorityEntityCreado);
    FxComunes.printJson("UsuarioCreadoRequest", request);
    return convertEntityToResponse(guardarUsuario);
  }

  @Override
  public Usua_auth_Response delete(Integer usuaId) {
    log.info("Implements :: delete :: {}", usuaId);
    Optional<UsuarioEntity> usuarioEliminar = repository.findById(usuaId);
    if (usuarioEliminar.isPresent()) {
      UsuarioEntity usuarioEntity = usuarioEliminar.get();
      Optional<UsuarioAuthorityEntity> authorityEliminar = usuarioAuthorityRepository.findById(usuarioEntity.getUsuaId());
      if (authorityEliminar.isPresent()) {
        UsuarioAuthorityEntity eliminarAutority = authorityEliminar.get();
        usuarioAuthorityRepository.delete(eliminarAutority);
        log.info(" authority eliminado  con ID -> {}", usuarioEntity.getUsuaId());
      } else {
        log.info(" autority no encontrado para el usuario con ID -> {}", usuarioEntity.getUsuaId());
      }
      repository.delete(usuarioEntity);
      log.info("  usuario eliminado con ID -> {}", usuarioEntity.getUsuaId());
      return convertEntityToResponse(usuarioEntity);
    } else {
      log.info(" usuario no encontrado para eliminar con ID -> {}", usuaId);
      return new Usua_auth_Response();
    }

  }

  @Override
  public Usua_auth_Response findById(Integer usuaId) {
    log.info("Implements :: findById :: {}", usuaId);
    Optional<UsuarioEntity> Usua_auth_Response = repository.findById(usuaId);
    if (Usua_auth_Response.isPresent()) {
      UsuarioEntity usuarioEntity = Usua_auth_Response.get();
      Usua_auth_Response response = new Usua_auth_Response();
      response.setUsuaNombre(usuarioEntity.getUsuaNombre());
      response.setUsuaApellido(usuarioEntity.getUsuaApellido());
      response.setUsuaCorreo(usuarioEntity.getUsuaCorreo());
      response.setUsuaTelefono(usuarioEntity.getUsuaTelefono());

      Optional<UsuarioAuthorityEntity> authorityResponse = usuarioAuthorityRepository.findById(usuarioEntity.getUsuaId());

      if (authorityResponse.isPresent()) {
        UsuarioAuthorityEntity authorityEntity = authorityResponse.get();
        response.setAuthIsActive(authorityEntity.getAuthIsActive());
        response.setAuthUsername(authorityEntity.getAuthUsername());
        response.setAuthRoles(authorityEntity.getAuthRoles());

      } else {
        log.info("Authority no encontrada para el usuario con Id-> {}", usuaId);
      }

      return response;
    } else {
      log.info(" Usuario no encontrado con Id-> {}", usuaId);
      return null;
    }
  }

  @Override
  public Usua_auth_Response update(Usua_auth_Request request) {
    log.info("Implements :: update :: {}", request.getUsuaId());

    // Buscar el usuario a actualizar
    UsuarioEntity usuarioExistente = repository.findById(request.getUsuaId()).orElse(null);
    if (usuarioExistente == null) {
      log.info("Usuario no encontrado con ID -> {}", request.getUsuaId());
      return new Usua_auth_Response();
    }

    usuarioExistente.setUsuaNombre(request.getUsuaNombre());
    usuarioExistente.setUsuaApellido(request.getUsuaApellido());
    usuarioExistente.setUsuaCorreo(request.getUsuaCorreo());
    usuarioExistente.setUsuaTelefono(request.getUsuaTelefono());
    usuarioExistente.setUsuaFechaModificado(LocalDateTime.now());

    UsuarioEntity usuarioActualizado = repository.save(usuarioExistente);
    log.info("Usuario actualizado con ID -> {}", usuarioExistente.getUsuaId());

    UsuarioAuthorityEntity authorityEntity = usuarioAuthorityRepository.findById(request.getUsuaId()).orElse(null);

    if (authorityEntity != null) {
      if (request.getAuthPassword() != null && !request.getAuthPassword().isEmpty()) {
        BCryptPasswordEncoder encriptarContrasena = new BCryptPasswordEncoder();
        String contrasenaEncriptada = encriptarContrasena.encode(request.getAuthPassword());
        authorityEntity.setAuthPassword(contrasenaEncriptada);
      }
      authorityEntity.setAuthUsername(request.getAuthUsername());
      authorityEntity.setAuthRoles(request.getAuthRoles());
      authorityEntity.setAuthIsActive(request.getAuthIsActive());
      authorityEntity.setAuthFechaModificado(LocalDateTime.now());

      usuarioAuthorityRepository.save(authorityEntity);
      log.info("Authority actualizada para el usuario con ID -> {}", usuarioExistente.getUsuaId());
    } else {
      log.info("Authority no encontrada para el usuario con ID -> {}", request.getUsuaId());
    }

    // Convertir la entidad actualizada a la respuesta
    return convertEntityToResponse(usuarioActualizado);
  }

  @Override
  public List<Usua_auth_Response> findAll() {
    log.info("Implements :: findAll");
    return repository.findAllUsers().stream().map(this::convertToUsuarioDTO).collect(Collectors.toList());
  }

  private Usua_auth_Response convertToUsuarioDTO(Map<String, Object> map) {
    Timestamp timestamp = (Timestamp) map.get("authFechaRegistrado");
    LocalDateTime fechaRegistrado = timestamp.toLocalDateTime();
    String formattedFechaRegistrado = DateUtil.formatFechaRegistrado(fechaRegistrado);
    return new Usua_auth_Response((Integer) map.get("usuaId"), (String) map.get("usuaNombre"), (String) map.get("usuaApellido"), (String) map.get("usuaTelefono"), (String) map.get("usuaCorreo"), (String) map.get("authUsername"), (String) map.get("authPassword"), (String) map.get("authRoles"), (Boolean) map.get("authIsActive"), formattedFechaRegistrado);
  }

  private Usua_auth_Response convertEntityToResponse(UsuarioEntity entity) {
    Usua_auth_Response response = new Usua_auth_Response();
    BeanUtils.copyProperties(entity, response);
    return response;
  }

  private UsuarioEntity convertRequestToEntity(Usua_auth_Request request) {
    UsuarioEntity entity = new UsuarioEntity();
    BeanUtils.copyProperties(request, entity);
    return entity;
  }

  /*
  private Usua_auth_Response convertEntityToResponseDTO(UsuarioEntity entity) {
    Usua_auth_Response response = new Usua_auth_Response();
    BeanUtils.copyProperties(entity, response);
    return response;
  }
  */

}
