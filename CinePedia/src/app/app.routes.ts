import { Routes } from '@angular/router';
import { Listagem } from './pages/listagem/listagem';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { HomePage } from './pages/home-page/home-page';
import { Perfil } from './pages/perfil/perfil';
import { Relatorio } from './pages/relatorio/relatorio';

export const routes: Routes = [
  { path: '', component: HomePage }, 
  { path: 'cadastro', component: Cadastro },//Quando a URL for /cadastro, carregue o componente cadastro.
  { path: 'login', component: Login },
  { path: 'listagem', component: Listagem},
  { path: 'perfil', component: Perfil },
  { path: 'relatorio', component: Relatorio },
];
