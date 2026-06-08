import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  carregando = signal(false);
  erro = signal('');

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  criar(): void {
    if (this.formulario.invalid) {
      // Marca todos os campos como "tocados" para exibir os erros visuais
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    this.erro.set('');

    const { nome, email, senha } = this.formulario.value;

    // Primeiro verifica se o email já está cadastrado
    this.usuariosService.buscarPorEmail(email!).subscribe({
      next: (encontrados) => {
        if (encontrados.length > 0) {
          this.erro.set('Este email já está cadastrado.');
          this.carregando.set(false);
          return;
        }

        // Email livre — faz o cadastro
        this.usuariosService.cadastrar({ nome: nome!, email: email!, senha: senha! }).subscribe({
          next: (novoUsuario) => {
            // Salva no localStorage igual ao login para já entrar autenticado
            localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));
            this.router.navigate(['/listagem']);
          },
          error: () => {
            this.erro.set('Erro ao criar conta. Verifique se o JSON-Server está rodando.');
            this.carregando.set(false);
          }
        });
      },
      error: () => {
        this.erro.set('Erro ao verificar email. Verifique se o JSON-Server está rodando.');
        this.carregando.set(false);
      }
    });
  }
}