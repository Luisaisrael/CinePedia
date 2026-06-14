import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TmdbService, FilmeCatalogo } from '../../services/tmdb.services';

@Component({
  selector: 'app-listagem',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listagem.html',
  styleUrl: './listagem.css',
})
export class Listagem implements OnInit {
  private tmdb = inject(TmdbService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  filmes = signal<FilmeCatalogo[]>([]);
  carregando = signal(true);
  erro = signal('');
  paginaAtual = signal(1);
  termoBusca = signal('');

  generos = signal<{ id: number; name: string }[]>([]);
  filtroGenero = signal('');
  filtroAno = signal('');
  filtroNota = signal('');

  anosDisponiveis = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  temFiltroAtivo = computed(() =>
    !!this.filtroGenero() || !!this.filtroAno() || !!this.filtroNota()
  );

  ngOnInit(): void {
    this.tmdb.getGeneros().subscribe(lista => this.generos.set(lista));

    this.route.queryParams.subscribe(params => {
      const busca = params['busca'] ?? '';
      this.termoBusca.set(busca);
      this.limparFiltros();

      if (busca.trim()) {
        this.executarBusca(busca);
      } else {
        this.paginaAtual.set(1);
        this.carregarFilmes();
      }
    });
  }

  carregarFilmes(): void {
    this.carregando.set(true);
    this.erro.set('');

    const filtros = {
      ano: this.filtroAno(),
      generoNome: this.filtroGenero(),
      notaMin: this.filtroNota(),
    };

    const requisicao$ = this.temFiltroAtivo()
      ? this.tmdb.discoverMovies(this.paginaAtual(), this.generos(), filtros)
      : this.tmdb.getPopularMovies(this.paginaAtual(), this.generos());

    requisicao$.subscribe({
      next: (dados) => {
        this.filmes.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar filmes.');
        this.carregando.set(false);
      }
    });
  }

  executarBusca(termo: string): void {
    this.carregando.set(true);
    this.erro.set('');

    this.tmdb.buscarFilmes(termo, this.generos()).subscribe({
      next: (dados) => {
        this.filmes.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao buscar filmes.');
        this.carregando.set(false);
      }
    });
  }

  aplicarFiltros(): void {
    this.paginaAtual.set(1);
    this.carregarFilmes();
  }

  limparFiltros(): void {
    this.filtroGenero.set('');
    this.filtroAno.set('');
    this.filtroNota.set('');
  }

  limparERecarregar(): void {
    this.limparFiltros();
    this.paginaAtual.set(1);
    this.carregarFilmes();
  }

  avancar(): void {
    this.paginaAtual.update(p => p + 1);
    this.carregarFilmes();
  }

  voltar(): void {
    if (this.paginaAtual() > 1) {
      this.paginaAtual.update(p => p - 1);
      this.carregarFilmes();
    }
  }

  onSelecionarFilme(filme: FilmeCatalogo): void {
    this.router.navigate(['/detalhe', filme.id]);
  }
}