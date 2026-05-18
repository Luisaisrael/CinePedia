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
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/1/1/9/5/5/8/6/1195586-the-devil-wears-prada-2-0-1000-0-1500-crop.jpg?v=0d955add69',
      rating: 4.2
    },
    {
      id: 2,
      title: 'Michael',
      year: 2025,
      director: 'Antoine Fuqua',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/8/4/1/1/0/3/841103-michael-2026-0-1000-0-1500-crop.jpg?v=1e8e478e40',
      rating: 4.7
    },
    {
      id: 3,
      title: 'Obsession',
      year: 2024,
      director: 'John Doe',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/1/2/3/4/4/7/2/1234472-obsession-2025-2-0-1000-0-1500-crop.jpg?v=cff6fc00b6',
      rating: 3.9
    },
    {
      id: 4,
      title: 'The Drama',
      year: 2025,
      director: 'Kristoffer Borgli',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/1/2/0/5/4/9/4/1205494-the-drama-0-1000-0-1500-crop.jpg?v=2320acafd5',
      rating: 4.5
    },
    {
      id: 5,
      title: 'Dune: Part Two',
      year: 2024,
      director: 'Denis Villeneuve',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/6/1/7/4/4/3/617443-dune-part-two-0-1000-0-1500-crop.jpg?v=cc533700f8',
      rating: 4.8
    },
    {
      id: 6,
      title: 'Oppenheimer',
      year: 2023,
      director: 'Christopher Nolan',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/7/8/4/3/2/8/784328-oppenheimer-0-1000-0-1500-crop.jpg?v=e3c6e7a32c',
      rating: 4.7
    },
    {
      id: 7,
      title: 'Everything Everywhere All at Once',
      year: 2022,
      director: 'Daniel Kwan, Daniel Scheinert',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/4/7/4/4/7/4/474474-everything-everywhere-all-at-once-0-1000-0-1500-crop.jpg?v=281f1a041e',
      rating: 4.4
    },
    {
      id: 8,
      title: 'Parasite',
      year: 2019,
      director: 'Bong Joon Ho',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/4/2/6/4/0/6/426406-parasite-0-1000-0-1500-crop.jpg?v=8f5653f710',
      rating: 4.9
    },
    {
      id: 9,
      title: 'Whiplash',
      year: 2014,
      director: 'Damien Chazelle',
      posterUrl: 'https://a.ltrbxd.com/resized/sm/upload/cl/dn/kr/f1/4C9LHDxMsoYI0S3iMPZdm3Oevwo-0-1000-0-1500-crop.jpg?v=d13ea36528',
      rating: 4.7
    },
    {
      id: 10,
      title: 'Spider-Man: Into the Spider-Verse',
      year: 2018,
      director: 'Bob Persichetti, Peter Ramsey',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/2/5/1/9/4/3/251943-spider-man-into-the-spider-verse-0-1000-0-1500-crop.jpg?v=538fe0ada6',
      rating: 4.6
    },
    {
      id: 11,
      title: 'La La Land',
      year: 2016,
      director: 'Damien Chazelle',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-1000-0-1500-crop.jpg?v=053670ff84',
      rating: 4.1
    },
    {
      id: 12,
      title: 'The Batman',
      year: 2022,
      director: 'Matt Reeves',
      posterUrl: 'https://a.ltrbxd.com/resized/film-poster/3/4/8/9/1/4/348914-the-batman-0-1000-0-1500-crop.jpg?v=ec12a8b7ce',
      rating: 4.0
    }
  ]);

  // 2. A função 'onSelectMovie'
  onSelectMovie(movie: MovieCatalogItem): void {
    alert(`Você clicou em "${movie.title}". Aqui abrirá a tela para dar nota, comentar e adicionar à lista.`);
  }
}
