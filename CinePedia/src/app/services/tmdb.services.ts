import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

export interface FilmeCatalogo {
  id: number;
  titulo: string;
  ano: number;
  diretor: string;
  posterUrl: string;
  nota: number;
  sinopse: string;
  generos: string[];
}

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private apiKey = 'a2769b968faa096c93ddddf5389ca5ad';
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient) {}

  getGeneros(): Observable<{ id: number; name: string }[]> {
    const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`;
    return this.http.get<any>(url).pipe(map(response => response.genres));
  }

  getPopularMovies(pagina: number = 1, listaGeneros: { id: number; name: string }[] = []): Observable<FilmeCatalogo[]> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=${pagina}`;

    return this.http.get<any>(url).pipe(
      map(response => response.results),
      switchMap(filmes => {
        const requisicoes = filmes.slice(0, 12).map((filme: any) =>
          this.http.get<any>(
            `${this.baseUrl}/movie/${filme.id}/credits?api_key=${this.apiKey}`
          ).pipe(
            map(creditos => {
              const diretor = creditos.crew.find((p: any) => p.job === 'Director');
              return {
                id: filme.id,
                titulo: filme.title,
                ano: new Date(filme.release_date).getFullYear(),
                diretor: diretor?.name ?? 'Desconhecido',
                posterUrl: filme.poster_path
                  ? `${this.imageUrl}${filme.poster_path}`
                  : 'assets/no-poster.png',
                nota: filme.vote_average,
                sinopse: filme.overview,
                generos: (filme.genre_ids as number[]).map(id => {
                  const genero = listaGeneros.find(g => g.id === id);
                  return genero?.name ?? '';
                }).filter(Boolean),
              };
            })
          )
        );
        return forkJoin(requisicoes) as Observable<FilmeCatalogo[]>;
      })
    );
  }

  discoverMovies(
    pagina: number = 1,
    listaGeneros: { id: number; name: string }[] = [],
    filtros: { ano?: string; generoNome?: string; notaMin?: string } = {}
  ): Observable<FilmeCatalogo[]> {
    let url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=pt-BR&page=${pagina}&sort_by=popularity.desc`;

    if (filtros.ano) url += `&primary_release_year=${filtros.ano}`;

    if (filtros.generoNome) {
      const genero = listaGeneros.find(g => g.name === filtros.generoNome);
      if (genero) url += `&with_genres=${genero.id}`;
    }

    if (filtros.notaMin) url += `&vote_average.gte=${filtros.notaMin}`;

    return this.http.get<any>(url).pipe(
      map(response => response.results),
      switchMap(filmes => {
        const requisicoes = filmes.slice(0, 12).map((filme: any) =>
          this.http.get<any>(
            `${this.baseUrl}/movie/${filme.id}/credits?api_key=${this.apiKey}`
          ).pipe(
            map(creditos => {
              const diretor = creditos.crew.find((p: any) => p.job === 'Director');
              return {
                id: filme.id,
                titulo: filme.title,
                ano: new Date(filme.release_date).getFullYear(),
                diretor: diretor?.name ?? 'Desconhecido',
                posterUrl: filme.poster_path
                  ? `${this.imageUrl}${filme.poster_path}`
                  : 'assets/no-poster.png',
                nota: filme.vote_average,
                sinopse: filme.overview,
                generos: (filme.genre_ids as number[]).map(id => {
                  const genero = listaGeneros.find(g => g.id === id);
                  return genero?.name ?? '';
                }).filter(Boolean),
              };
            })
          )
        );
        return forkJoin(requisicoes) as Observable<FilmeCatalogo[]>;
      })
    );
  }

  buscarFilmes(query: string, listaGeneros: { id: number; name: string }[] = []): Observable<FilmeCatalogo[]> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${encodeURIComponent(query)}`;

    return this.http.get<any>(url).pipe(
      map(response =>
        response.results.slice(0, 12).map((filme: any) => ({
          id: filme.id,
          titulo: filme.title,
          ano: new Date(filme.release_date).getFullYear(),
          diretor: '',
          posterUrl: filme.poster_path
            ? `${this.imageUrl}${filme.poster_path}`
            : 'assets/no-poster.png',
          nota: filme.vote_average,
          sinopse: filme.overview,
          generos: (filme.genre_ids as number[]).map(id => {
            const genero = listaGeneros.find(g => g.id === id);
            return genero?.name ?? '';
          }).filter(Boolean),
        }))
      )
    );
  }

  getDetalhesFilme(id: number): Observable<FilmeCatalogo> {
    const detalhes$ = this.http.get<any>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`
    );
    const creditos$ = this.http.get<any>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );

    return forkJoin([detalhes$, creditos$]).pipe(
      map(([filme, creditos]) => {
        const diretor = creditos.crew.find((p: any) => p.job === 'Director');
        return {
          id: filme.id,
          titulo: filme.title,
          ano: new Date(filme.release_date).getFullYear(),
          diretor: diretor?.name ?? 'Desconhecido',
          posterUrl: filme.poster_path
            ? `${this.imageUrl}${filme.poster_path}`
            : 'assets/no-poster.png',
          nota: filme.vote_average,
          sinopse: filme.overview,
          generos: (filme.genres as any[]).map(g => g.name),
        };
      })
    );
  }
}