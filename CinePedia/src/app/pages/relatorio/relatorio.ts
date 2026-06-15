import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UsuariosService } from '../../services/usuarios';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio.html',
  styleUrl: './relatorio.css'
})
export class Relatorio implements OnInit {
  urlRelatorio: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    const usuario = this.usuariosService.getUsuarioLogado();

    if (usuario?.id) {
      const urlBase = 'https://app.powerbi.com/reportEmbed?reportId=b7dc2799-4f2c-4f41-8f92-e108d36a241b&autoAuth=true&ctid=c3231073-b8ed-4a2a-a023-9915d11f8a13';
      const filtro = `&filter=dbUsuarios/id eq '${usuario.id}'`;

      this.urlRelatorio = this.sanitizer.bypassSecurityTrustResourceUrl(urlBase + filtro);
    }
  }
}