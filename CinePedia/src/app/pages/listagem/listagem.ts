import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router  } from '@angular/router';
import { TmdbService, FilmeCatalogo } from '../../services/tmdb.services';

@Component({
  selector: 'app-listagem',
  imports: [CommonModule, RouterLink],
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

  ngOnInit(): void {
    // Fica escutando mudanças na URL (ex: busca diferente vinda do menu)
    this.route.queryParams.subscribe(params => {
      const busca = params['busca'] ?? '';
      this.termoBusca.set(busca);

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

    this.tmdb.getPopularMovies(this.paginaAtual()).subscribe({
      next: (dados) => {
        this.filmes.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar filmes. Verifique sua API key.');
        this.carregando.set(false);
      }
    });
  }

  executarBusca(termo: string): void {
    this.carregando.set(true);
    this.erro.set('');

    this.tmdb.buscarFilmes(termo).subscribe({
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

// Navega para a tela de detalhe passando o ID do filme como parâmetro de rota
  onSelecionarFilme(filme: FilmeCatalogo): void {
    this.router.navigate(['/detalhe', filme.id]);
  }
}