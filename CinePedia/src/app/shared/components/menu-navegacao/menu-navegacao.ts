import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios'; 

@Component({
  selector: 'app-menu-navegacao',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-navegacao.html',
  styleUrl: './menu-navegacao.css',
})
export class MenuNavegacao {
  private router = inject(Router);
  private usuariosService = inject(UsuariosService);
  termoBusca = '';

  buscar(): void {
    const termo = this.termoBusca.trim();
    if (termo) {
      this.router.navigate(['/listagem'], { queryParams: { busca: termo } });
    }
  }

  onDigitar(event: Event): void {
    this.termoBusca = (event.target as HTMLInputElement).value;
  }

  sair(): void {
  this.usuariosService.logout(); // remove o usuarioLogado do localStorage
  this.router.navigate(['/login']);
  }
}