import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
    providedIn: 'root'
})

export class MovieService {
    
    private baseUrl = 'http://localhost:3000/api/movies';
    private baseWatchedUrl = 'http://localhost:3000/api/watched';
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

    createWatchedMovieEntry(movieId: number, userId: number, rating?: number): Observable<any> {
      const payload = {
        movieId,
        userId,
        rating
      };
  
      return this.http.post(`${this.baseWatchedUrl}`, payload);
    }

    markMovieAsUnwatched(movieId: number, userId: number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.baseUrl}/watched/${movieId}/${userId}`);
    }
    

    isMovieWatched(movieId: number, userId: number): Observable<{ isWatched: boolean, rating?: number }> {
      return this.http.get<{ isWatched: boolean, rating?: number }>(`http://localhost:3000/api/movies/watched/${movieId}/${userId}`)
        .pipe(
          map(response => ({
            isWatched: response.isWatched,
            rating: response.rating
          }))
        );
    }

    updateMovieRating(userId: number, movieId: number, rating: number): Observable<any> {
      const url = `${this.baseWatchedUrl}/update-rating`;
      const body = { userId, movieId, rating };
  
      return this.http.put(url, body);
    }

    
    getMoviesWatchedByUser(userId: number): Observable<any[]> {
      return this.http.get<any>(`${this.baseUrl}/watched/${userId}`).pipe(
        map(response => response.moviesWatched) // Extract the 'moviesWatched' array
      );
    }
    
    

    //getBatchMovies (for accessing the movie data for all of the )

    


    //getWatchedList

    //isWatched

   

    //updateRating
    

}


