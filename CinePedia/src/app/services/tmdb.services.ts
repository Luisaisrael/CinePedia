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
}

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private apiKey = 'a2769b968faa096c93ddddf5389ca5ad';  
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private http: HttpClient) {}

  getPopularMovies(pagina: number = 1): Observable<FilmeCatalogo[]> {
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
              };
            })
          )
        );
        return forkJoin(requisicoes) as Observable<FilmeCatalogo[]>;
      })
    );
  }

  buscarFilmes(query: string): Observable<FilmeCatalogo[]> {
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
        }))
      )
    );
  }

  // Busca os detalhes completos de um único filme pelo ID do TMDB
getDetalhesFilme(id: number): Observable<FilmeCatalogo> {
  //duas requisições em paralelo: detalhes e creditos (para pegar o diretor)
  const detalhes$ = this.http.get<any>(
    `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`
  );
  const creditos$ = this.http.get<any>(
    `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
  );

  return forkJoin([detalhes$, creditos$]).pipe( //espera as duas respostas para entrar no map
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
      };
    })
  );
}
}