import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TmdbService, FilmeCatalogo } from '../../services/tmdb.services';
import { AvaliacoesService, Avaliacao } from '../../services/avaliacoes.service';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css',
})
export class Detalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdb = inject(TmdbService);
  private avaliacoesService = inject(AvaliacoesService);

  // Dados vindos da API do TMDB
  filme = signal<FilmeCatalogo | null>(null);

  // Avaliações vindas do JSON-Server
  avaliacoes = signal<Avaliacao[]>([]);

  carregando = signal(true);
  erro = signal('');

  // Nota que o usuário está selecionando
  notaSelecionada = signal(0);
  notaHover = signal(0); // para efeito hover nas estrelas

  // Formulário de avaliação usando Reactive Forms
  formulario = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(2)]),
    comentario: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  // Média calculada só das avaliações do CinePedia (escala 1-5)
  get mediaCinePedia(): string {
    const lista = this.avaliacoes();
    if (!lista.length) return 'Sem avaliações';
    const media = lista.reduce((acc, a) => acc + a.nota, 0) / lista.length;
    return media.toFixed(1);
  }

  ngOnInit(): void {
    // Pega o :id da URL (ex: /detalhe/550 → id = '550')
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Carrega detalhes do filme (TMDB) e avaliações (JSON-Server) em paralelo
    this.tmdb.getDetalhesFilme(id).subscribe({
      next: (dados) => {
        this.filme.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar detalhes do filme.');
        this.carregando.set(false);
      }
    });

    this.carregarAvaliacoes(id);
  }

  carregarAvaliacoes(filmeId: number): void {
    this.avaliacoesService.getAvaliacoesPorFilme(filmeId).subscribe({
      next: (dados) => this.avaliacoes.set(dados),
      error: () => {} // silencioso — JSON-Server pode não estar rodando
    });
  }

  // Chamado quando o usuário clica em uma estrela
  selecionarNota(nota: number): void {
    this.notaSelecionada.set(nota);
  }

  // Chamado ao enviar o formulário
  enviarAvaliacao(): void {
    if (this.formulario.invalid || this.notaSelecionada() === 0) return;

    const filmeId = Number(this.route.snapshot.paramMap.get('id'));

    const novaAvaliacao: Avaliacao = {
      filmeId,
      usuario: this.formulario.value.usuario!,
      nota: this.notaSelecionada(),
      comentario: this.formulario.value.comentario!,
      data: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
    };

    this.avaliacoesService.salvarAvaliacao(novaAvaliacao).subscribe({
      next: (salva) => {
        // Adiciona a nova avaliação no topo da lista sem recarregar tudo
        this.avaliacoes.update(lista => [salva, ...lista]);
        this.formulario.reset();
        this.notaSelecionada.set(0);
      },
      error: () => alert('Erro ao salvar avaliação. Verifique se o JSON-Server está rodando.')
    });
  }

  // Array auxiliar para renderizar as 5 estrelas no template
  estrelas = [1, 2, 3, 4, 5];
}
