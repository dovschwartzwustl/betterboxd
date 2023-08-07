import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
    providedIn: 'root'
})

export class MovieService {
    
    private baseUrl = 'http://localhost:3000/api/movies';
    private defaultPosterAddress = 'https://image.tmdb.org/t/p/original';

    constructor(private http: HttpClient) {}
        
    getMovies(): Observable<Movie[]> {
        return this.http.get<any>(this.baseUrl).pipe(
          map(response => response.results) // Parse the 'results' array from the API response
        );
    }

    getPosterUrl(posterPath: string): string {
    return this.defaultPosterAddress + posterPath;
    }

    getMovieDetails(movieId: string): Observable<any> {
        const url = `${this.baseUrl}/details/${movieId}`;
        return this.http.get<any>(url);
      }

    getSearchResults(query: string): Observable<Movie[]> {
      const url = `${this.baseUrl}/search/${query}`;
      return this.http.get<any>(url).pipe(
        map(response => response.results)
      );;
    }
    

}


