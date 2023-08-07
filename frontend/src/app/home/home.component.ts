import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movies.service';
import { MovieComponent } from '../movie/movie.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { Movie } from '../movie';
import { RouterModule } from '@angular/router';


interface ApiResponse {
  page: number;
  results: Movie[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieComponent, SearchInputComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  movies: Movie[] = [];

  constructor(private MovieService: MovieService) {
  }

  ngOnInit() {
    this.fetchMovies(); // Call the fetchMovies() method when the component is initialized
  }

  fetchMovies() {
    this.MovieService.getMovies().subscribe({
      next: (response) => {
        this.movies = response; // Assign the 'results' array to the 'movies' property
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  
  
  
}
