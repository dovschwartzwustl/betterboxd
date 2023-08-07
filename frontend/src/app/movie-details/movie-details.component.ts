import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies.service';
import { AuthService } from '../auth.service';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {
  movieId: string | null = null;
  movie: Movie | undefined;
  isLoggedIn = false;
  isMovieWatched = false;

  constructor(private route: ActivatedRoute, private MovieService: MovieService, private AuthService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      if (this.movieId) {
        // Use the movieId to fetch movie details from the service
        this.MovieService.getMovieDetails(this.movieId).subscribe({
          next: response => {
            this.movie = response;
          },
          error: error => {
            console.error('Error fetching movie details:', error);
          }
        });
      }
    });

    // Check if user is logged in
    this.AuthService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;

      if (loggedIn) {
        // Get user ID from token
        const userId = this.AuthService.getUserIdFromToken();

        // Check if movie is watched by the user
        this.MovieService.isMovieWatched(+this.movieId!, userId).subscribe(watched => {
          this.isMovieWatched = watched;
        });
      }
    });
  }

  markMovieAsWatched(movieId: number, rating?: number) {
    const userId = this.AuthService.getUserIdFromToken();

    this.MovieService.createWatchedMovieEntry(movieId, userId, rating).subscribe({
      next: response => {
        console.log('Watched movie entry created:', response);
      },
      error: error => {
        console.error('Error creating watched movie entry:', error);
      }
    });
  }


  getPosterUrl(posterPath: string): string {
    return this.MovieService.getPosterUrl(posterPath);
  }
}
