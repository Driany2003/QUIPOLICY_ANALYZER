package com.quipolicy_analyzer.business.websec;

import com.quipolicy_analyzer.model.entity.UsuarioAuthorityEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class UserDetailsImpl implements UserDetails {

  private static final long serialVersionUID = 1L;
  private Integer usuId;
  private String userName;
  private String password;
  private String roles;
  private boolean estado;
  private List<GrantedAuthority> authorities;

  public UserDetailsImpl(UsuarioAuthorityEntity user) {
    this.usuId = user.getUsuaId();
    this.userName = user.getAuthUsername();
    this.password = user.getAuthPassword();
    this.roles = user.getAuthRoles();
    this.estado = user.getAuthIsActive();
    this.authorities = Arrays.stream(roles.split(";")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
  }

  public UserDetailsImpl() {
  }

  public Integer getUsuId() {
    return usuId;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return userName;
  }

  @Override
  public boolean isEnabled() {
    return estado;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

}
