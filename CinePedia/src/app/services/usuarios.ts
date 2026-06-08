import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/usuarios';

  // Busca todos os usuários e filtra pelo email+senha. simula autenticação
  login(email: string, senha: string): Observable<Usuario | null> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(usuarios => {
        const encontrado = usuarios.find(u => u.senha === senha);
        return encontrado ?? null; // retorna null se não encontrar
      }),
      tap(usuario => {
        if (usuario) {
          // Salva o usuário logado no localStorage para o AuthGuard verificar
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        }
      })
    );
  }

  // Verifica se o email já existe antes de criar conta
  cadastrar(dados: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, dados);
  }

  // Busca por email para checar duplicidade antes do cadastro
  buscarPorEmail(email: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}`);
  }

  // Retorna o usuário do localStorage (usado pelo AuthGuard e navbar)
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