import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Avaliacao {
  id?: number;
  filmeId: number;
  usuarioId: string;    // ← novo: id do usuário logado
  usuario: string;      // nome, mantido para exibição
  nota: number;
  comentario: string;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class AvaliacoesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/avaliacoes';

  getAvaliacoesPorFilme(filmeId: number): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${this.apiUrl}?filmeId=${filmeId}`);
  }

  salvarAvaliacao(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.apiUrl, avaliacao);
  }

  deletarAvaliacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}