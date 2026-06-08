import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Representa uma avaliação feita pelo usuário do CinePedia
export interface Avaliacao {
  id?: number;          // gerado pelo JSON-Server automaticamente
  filmeId: number;      // ID do filme na API do TMDB
  usuario: string;      // nome do usuário (fixo por enquanto, depois virá do AuthGuard)
  nota: number;         // 1 a 5 estrelas (escala do CinePedia)
  comentario: string;   // texto livre
  data: string;         // data no formato 'YYYY-MM-DD'
}

@Injectable({ providedIn: 'root' })
export class AvaliacoesService {
  private http = inject(HttpClient);

  // URL base do JSON-Server rodando local
  private apiUrl = 'http://localhost:3000/avaliacoes';

  // Busca todas as avaliações de um filme específico pelo filmeId
  getAvaliacoesPorFilme(filmeId: number): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}?filmeId=${filmeId}`);
  }

  // Salva uma nova avaliação no JSON-Server (POST)
  salvarAvaliacao(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.apiUrl, avaliacao);
  }

  // Remove uma avaliação pelo ID
  deletarAvaliacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}