import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  //não precisa de guard
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage),
  },

  // Rotas publicas
  { path: 'login',    loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'cadastro', loadComponent: () => import('./pages/cadastro/cadastro').then(m => m.Cadastro) },
  { path: 'home-page', loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage) },

  // Rotas protegidas — redireciona para /login se não estiver autenticado
  {
    path: 'listagem',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/listagem/listagem').then(m => m.Listagem),
  },
  {
    path: 'detalhe/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/detalhe/detalhe').then(m => m.Detalhe),
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil),
  },
  {
    path: 'relatorio',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/relatorio/relatorio').then(m => m.Relatorio),
  },
];