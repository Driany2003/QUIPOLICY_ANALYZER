package com.quipolicy_analyzer.business.websec;

import com.quipolicy_analyzer.model.entity.UsuarioAuthorityEntity;
import com.quipolicy_analyzer.repository.AuthorityRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private AuthorityRepository usuarioAuthorityRepository;

  @Override
  public UserDetails loadUserByUsername(String authUsername) throws UsernameNotFoundException {
    Optional<UsuarioAuthorityEntity> user = usuarioAuthorityRepository.findByUsername(authUsername);
    user.orElseThrow(() -> new UsernameNotFoundException(authUsername + " not found."));
    return user.map(UserDetailsImpl::new).get();
  }

}
