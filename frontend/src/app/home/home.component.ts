import { Component } from '@angular/core';
import { MovieService } from '../movies.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  movies: any[] = [];

  constructor(private MovieService: MovieService) {}

  fetchMovies() {
    this.MovieService.getMovies().subscribe({
      next: (movies) => {
        console.log(movies)
        this.movies = movies;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
  }
  
  
}
