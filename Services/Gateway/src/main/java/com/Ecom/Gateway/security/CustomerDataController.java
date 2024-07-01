package com.Ecom.Gateway.security;

import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


@Service
public class CustomerDataController {

    public Mono<String> getUserId() {
        return ReactiveSecurityContextHolder.getContext()
                .map(context -> (Jwt) context.getAuthentication().getPrincipal())
                .map(jwt -> jwt.getClaim("sub"));
    }

}
