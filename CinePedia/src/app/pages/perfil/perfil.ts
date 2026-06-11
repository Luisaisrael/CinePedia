import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuariosService } from '../../services/usuarios';
import { TmdbService } from '../../services/tmdb.services';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  form!: FormGroup;
  usuario: any = null;
  filmesLista: any[] = [];
  salvando = false;
  mensagem = '';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private tmdbService: TmdbService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.usuariosService.getUsuarioLogado();

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.form = this.fb.group({
      nome: [this.usuario.nome || ''],
      bio: [this.usuario.bio || '']
    });

    this.carregarMinhaLista();
  }

  carregarMinhaLista() {
    const ids: number[] = JSON.parse(localStorage.getItem('minhaLista') || '[]');

    if (ids.length === 0) {
      this.filmesLista = [];
      return;
    }

    // Busca detalhes de cada filme em paralelo
    const requisicoes = ids.map(id =>
      this.tmdbService.getDetalhesFilme(id).pipe(catchError(() => of(null)))
    );

    forkJoin(requisicoes).subscribe(filmes => {
      this.filmesLista = filmes.filter(f => f !== null);
    });
  }

  salvarPerfil() {
    if (!this.usuario?.id) return;

    this.salvando = true;
    const dados = this.form.value;

    this.usuariosService.atualizarPerfil(this.usuario.id, dados).subscribe({
      next: (usuarioAtualizado) => {
        // Atualiza o localStorage com os novos dados
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
        this.usuario = usuarioAtualizado;
        this.mensagem = 'Perfil salvo!';
        this.salvando = false;
        setTimeout(() => this.mensagem = '', 3000);
      },
      error: () => {
        this.mensagem = 'Erro ao salvar. Tente novamente.';
        this.salvando = false;
      }
    });
  }

  removerDaLista(filmeId: number) {
    const ids: number[] = JSON.parse(localStorage.getItem('minhaLista') || '[]');
    const novaLista = ids.filter(id => id !== filmeId);
    localStorage.setItem('minhaLista', JSON.stringify(novaLista));
    this.filmesLista = this.filmesLista.filter(f => f.id !== filmeId);
  }

  irParaDetalhe(filmeId: number) {
    this.router.navigate(['/detalhe', filmeId]);
  }
}
