import { Routes } from '@angular/router';
import { Listagem } from './pages/listagem/listagem';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },  //onde cada objeto define a URL (path) e qual componente deve ser renderizado
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login },
  { path: 'filmes', component: Listagem},
];
