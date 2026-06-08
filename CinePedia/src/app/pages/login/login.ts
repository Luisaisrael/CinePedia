import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  carregando = signal(false);
  erro = signal('');

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });

  entrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    this.erro.set('');

    const { email, senha } = this.formulario.value;

    this.usuariosService.login(email!, senha!).subscribe({
      next: (usuario) => {
        if (!usuario) {
          // login() retorna null quando email/senha não batem
          this.erro.set('Email ou senha incorretos.');
          this.carregando.set(false);
          return;
        }
        this.router.navigate(['/listagem']);
      },
      error: () => {
        this.erro.set('Erro ao conectar. Verifique se o JSON-Server está rodando.');
        this.carregando.set(false);
      }
    });
  }
}