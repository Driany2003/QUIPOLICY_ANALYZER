package com.quipolicy_analyzer.business.Impl;

import com.quipolicy_analyzer.business.IUsuarioService;
import com.quipolicy_analyzer.model.api.usuario.UsuarioRequest;
import com.quipolicy_analyzer.model.api.usuario.UsuarioResponse;
import com.quipolicy_analyzer.model.api.usuario.dto.Usua_auth_listar_Response;
import com.quipolicy_analyzer.model.entity.UsuarioAuthorityEntity;
import com.quipolicy_analyzer.model.entity.UsuarioEntity;
import com.quipolicy_analyzer.repository.AuthorityRepository;
import com.quipolicy_analyzer.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.quipolicy_analyzer.util.funciones.FxComunes;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioImpl implements IUsuarioService {


  private final UsuarioRepository repository;
  private final AuthorityRepository usuarioAuthorityRepository;

  @Override
  public UsuarioResponse create(UsuarioRequest request) {
    log.info("Implements :: create :: {}", request.getUsuaId());
    UsuarioEntity usuarioCreado = convertRequestToEntity(request);
    usuarioCreado.setUsuaFechaRegistrado(LocalDateTime.now());
    UsuarioEntity guardarUsuario = repository.save(usuarioCreado);

    UsuarioAuthorityEntity usuarioAuthorityEntityCreado = new UsuarioAuthorityEntity();
    usuarioAuthorityEntityCreado.setAuthFechaRegistrado(LocalDateTime.now());
    usuarioAuthorityEntityCreado.setAuthIsActive(true);
    usuarioAuthorityRepository.save(usuarioAuthorityEntityCreado);
    FxComunes.printJson("UsuarioCreadoRequest", request);
    return convertEntityToResponse(guardarUsuario);
    //validar
  }

  @Override
  public UsuarioResponse delete(Integer usuaId) {
    log.info("Implements :: delete :: {}", usuaId);
    Optional<UsuarioEntity> usuarioEliminar = repository.findById(usuaId);
    if(usuarioEliminar.isPresent()){
      UsuarioEntity usuarioEntity = usuarioEliminar.get();
      Optional<UsuarioAuthorityEntity> authorityEliminar = usuarioAuthorityRepository.findById(usuarioEntity.getUsuaId());
      if(authorityEliminar.isPresent()){
        UsuarioAuthorityEntity eliminarAutority = authorityEliminar.get();
        usuarioAuthorityRepository.delete(eliminarAutority);
        log.info(" authority eliminado  con ID -> {}", usuarioEntity.getUsuaId());
      }
      else{
        log.info(" autority no encontrado para el usuario con ID -> {}", usuarioEntity.getUsuaId());
      }
      repository.delete(usuarioEntity);
      log.info("  usuario eliminado con ID -> {}", usuarioEntity.getUsuaId());
      return convertEntityToResponse(usuarioEntity);
    }
    else{
      log.info(" usuario no encontrado para eliminar con ID -> {}", usuaId);
      return new UsuarioResponse();
    }

  }

  @Override
  public UsuarioResponse findById(Integer usuaId) {
    log.info("Implements :: findById :: {}", usuaId);
    Optional<UsuarioEntity> usuarioResponse = repository.findById(usuaId);
    if(usuarioResponse.isPresent()){
      UsuarioEntity usuarioEntity = usuarioResponse.get();
      UsuarioResponse response = new UsuarioResponse();
      response.setUsuaNombre(usuarioEntity.getUsuaNombre());
      response.setUsuaApellido(usuarioEntity.getUsuaApellido());
      response.setUsuaCorreo(usuarioEntity.getUsuaCorreo());
      return response;
    }
    else{
      log.info(" Usuario no encontrado con Id-> {}", usuaId);
      return null;
    }
  }

  @Override
  public UsuarioResponse update(UsuarioRequest request) {
    return null;
    //tengo que crear un dto para uthoruty y usaurio para actualizar en una tabla.
  }

  @Override
  public List<Usua_auth_listar_Response> findAll() {
    log.info("Implements :: findAll");
    return repository.findAll().stream().map(this::convertEntityToResponseDTO).collect(Collectors.toList());
  }


  private UsuarioResponse convertEntityToResponse(UsuarioEntity entity){
    UsuarioResponse response = new UsuarioResponse();
    BeanUtils.copyProperties(entity, response);
    return response;
  }

  private UsuarioEntity convertRequestToEntity(UsuarioRequest request){
    UsuarioEntity entity = new UsuarioEntity();
    BeanUtils.copyProperties(request, entity);
    return entity;
  }

  private Usua_auth_listar_Response convertEntityToResponseDTO(UsuarioEntity entity){
    Usua_auth_listar_Response response = new Usua_auth_listar_Response();
    BeanUtils.copyProperties(entity, response);
    return response;
  }

}
