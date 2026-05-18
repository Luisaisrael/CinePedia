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
  selector: 'app-listagem',
  imports: [CommonModule],
  templateUrl: './listagem.html',
  styleUrl: './listagem.css',
})
export class Listagem {
  // 1. A propriedade 'movies'
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
    },
    {
      id: 5,
      title: 'Dune: Part Two',
      year: 2024,
      director: 'Denis Villeneuve',
      posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80',
      rating: 4.8
    },
    {
      id: 6,
      title: 'Oppenheimer',
      year: 2023,
      director: 'Christopher Nolan',
      posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
      rating: 4.7
    },
    {
      id: 7,
      title: 'Everything Everywhere All at Once',
      year: 2022,
      director: 'Daniel Kwan, Daniel Scheinert',
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80',
      rating: 4.4
    },
    {
      id: 8,
      title: 'Parasite',
      year: 2019,
      director: 'Bong Joon Ho',
      posterUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80',
      rating: 4.9
    },
    {
      id: 9,
      title: 'Whiplash',
      year: 2014,
      director: 'Damien Chazelle',
      posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
      rating: 4.7
    },
    {
      id: 10,
      title: 'Spider-Man: Into the Spider-Verse',
      year: 2018,
      director: 'Bob Persichetti, Peter Ramsey',
      posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80',
      rating: 4.6
    },
    {
      id: 11,
      title: 'La La Land',
      year: 2016,
      director: 'Damien Chazelle',
      posterUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80',
      rating: 4.1
    },
    {
      id: 12,
      title: 'The Batman',
      year: 2022,
      director: 'Matt Reeves',
      posterUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80',
      rating: 4.0
    }
  ]);

  // 2. A função 'onSelectMovie' que o HTML também está reclamando:
  onSelectMovie(movie: MovieCatalogItem): void {
    alert(`Você clicou em "${movie.title}". Aqui abrirá a tela para dar nota, comentar e adicionar à lista.`);
  }
}
