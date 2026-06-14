import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface Usuario {
  id?: string;       // ← corrigido de number para string
  nome: string;
  email: string;
  senha: string;
  bio?: string;      // ← mantém, você já usa no perfil
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/usuarios';

  login(email: string, senha: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(usuarios => {
        const encontrado = usuarios.find(u => u.senha === senha);
        return encontrado ?? null;
      }),
      tap(usuario => {
        if (usuario) {
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        }
      })
    );
  }

  cadastrar(dados: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, dados);
  }

  buscarPorEmail(email: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }

  atualizarPerfil(id: string, dados: { nome?: string; bio?: string }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, dados);
  }

  getUsuarioLogado(): Usuario | null {
    const dados = localStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : null;
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
  }

  estaLogado(): boolean {
    return !!localStorage.getItem('usuarioLogado');
  }
}