import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TmdbService, FilmeCatalogo } from '../../services/tmdb.services';
import { AvaliacoesService, Avaliacao } from '../../services/avaliacoes.service';
import { UsuariosService } from '../../services/usuarios';

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
  private usuariosService = inject(UsuariosService);

  filme = signal<FilmeCatalogo | null>(null);
  avaliacoes = signal<Avaliacao[]>([]);
  carregando = signal(true);
  erro = signal('');
  notaSelecionada = signal(0);
  notaHover = signal(0);
  adicionadoNaLista = signal(false);

  // Chaves do localStorage já com o id do usuário
  private chaveMinhaLista = '';
  private chaveNotasUsuario = '';

  // Formulário sem o campo usuario — vem do perfil logado
  formulario = new FormGroup({
    comentario: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get mediaCinePedia(): string {
    const lista = this.avaliacoes();
    if (!lista.length) return 'Sem avaliações';
    const media = lista.reduce((acc, a) => acc + a.nota, 0) / lista.length;
    return media.toFixed(1);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const usuario = this.usuariosService.getUsuarioLogado();

    // Monta as chaves com o id do usuário logado
    this.chaveMinhaLista = `minhaLista_${usuario?.id}`;
    this.chaveNotasUsuario = `notasUsuario_${usuario?.id}`;

    // Verifica se o filme já está na lista salva
    const listaSalva: number[] = JSON.parse(localStorage.getItem(this.chaveMinhaLista) || '[]');
    this.adicionadoNaLista.set(listaSalva.includes(id));

    // Carrega nota que o usuário já deu para este filme
    const notasSalvas = JSON.parse(localStorage.getItem(this.chaveNotasUsuario) || '{}');
    if (notasSalvas[id]) {
      this.notaSelecionada.set(notasSalvas[id]);
    }

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
      error: () => {}
    });
  }

  selecionarNota(nota: number): void {
    this.notaSelecionada.set(nota);

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const notasSalvas = JSON.parse(localStorage.getItem(this.chaveNotasUsuario) || '{}');
    notasSalvas[id] = nota;
    localStorage.setItem(this.chaveNotasUsuario, JSON.stringify(notasSalvas));
  }

  adicionarNaLista(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const lista: number[] = JSON.parse(localStorage.getItem(this.chaveMinhaLista) || '[]');

    if (!lista.includes(id)) {
      lista.push(id);
      localStorage.setItem(this.chaveMinhaLista, JSON.stringify(lista));
      this.adicionadoNaLista.set(true);
    }
  }

  enviarAvaliacao(): void {
    if (this.formulario.invalid || this.notaSelecionada() === 0) return;

    const filmeId = Number(this.route.snapshot.paramMap.get('id'));
    const usuario = this.usuariosService.getUsuarioLogado();

    const novaAvaliacao: Avaliacao = {
      filmeId,
      usuarioId: usuario!.id as string,   // ← id para o Power BI relacionar
      usuario: usuario!.nome,              // ← nome vem do perfil logado
      nota: this.notaSelecionada(),
      comentario: this.formulario.value.comentario!,
      data: new Date().toISOString().split('T')[0],
    };

    this.avaliacoesService.salvarAvaliacao(novaAvaliacao).subscribe({
      next: (salva) => {
        this.avaliacoes.update(lista => [salva, ...lista]);
        this.formulario.reset();
        this.notaSelecionada.set(0);
      },
      error: () => alert('Erro ao salvar avaliação. Verifique se o JSON-Server está rodando.')
    });
  }

  estrelas = [1, 2, 3, 4, 5];
}