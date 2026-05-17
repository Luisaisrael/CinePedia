import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MovieCatalogItem {
  id: number;
  title: string;
  year: number;
  director: string;
  posterUrl: string;
  rating: number;
}

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})

export class MovieList {// Dados mockados com imagens reais do Unsplash (fáceis de testar)
  movies = signal<MovieCatalogItem[]>([
    {
      id: 1,
      title: 'The Devil Wears Prada 2',
      year: 2026,
      director: 'David Frankel',
      posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80',
      rating: 4.2
    },
    {
      id: 2,
      title: 'Michael',
      year: 2025,
      director: 'Antoine Fuqua',
      posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
      rating: 4.7
    },
    {
      id: 3,
      title: 'Obsession',
      year: 2024,
      director: 'John Doe',
      posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80',
      rating: 3.9
    },
    {
      id: 4,
      title: 'The Drama',
      year: 2025,
      director: 'Kristoffer Borgli',
      posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80',
      rating: 4.5
    }
  ]);

  // Função para simular o clique e abertura do modal/ação de avaliar
  onSelectMovie(movie: MovieCatalogItem): void {
    alert(`Você clicou em "${movie.title}". Aqui abrirá a tela/modal para dar nota, comentar e adicionar à lista.`);
    // Futuramente aqui você fará a navegação ou abrirá um Modal de avaliação
  }
}
