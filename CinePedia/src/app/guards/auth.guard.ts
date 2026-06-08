import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios';

// CanActivateFn é o tipo moderno de guard no Angular 17+ (sem classe, só função)
export const authGuard: CanActivateFn = () => {
  const usuariosService = inject(UsuariosService);
  const router = inject(Router);

  if (usuariosService.estaLogado()) {
    return true; // usuário logado — deixa acessar a rota
  }

  // Não está logado — redireciona pro login e bloqueia a rota
  router.navigate(['/login']);
  return false;
};