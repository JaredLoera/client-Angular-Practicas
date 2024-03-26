import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const rolsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.getUser()?.rol_nombre === 'Administrador'){
    return true;
  }
  router.navigate(['/']);
  return false;
};
