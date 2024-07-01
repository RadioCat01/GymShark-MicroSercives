import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from '../KeyCloak/keycloak.service';

export const authGuard: CanActivateFn = (): boolean => {
  const tokenService: KeycloakService = inject(KeycloakService);
  const router :Router = inject(Router);
  if(tokenService.keycloak.isTokenExpired()){
    router.navigate(['login']);
    return false;
  }
  return true;
};
