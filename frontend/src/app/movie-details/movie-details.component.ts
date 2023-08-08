import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies.service';
import { AuthService } from '../auth.service';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { of,Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {
  movieId: string | null = null;
  rating: number | undefined = undefined;
  movie: Movie | undefined;
  isLoggedIn$: Observable<boolean>;
  isMovieWatched: boolean = false;

  private isLoggedInSubscription: Subscription | undefined;

  

  constructor(private route: ActivatedRoute, private MovieService: MovieService, private AuthService: AuthService) {
    this.isLoggedIn$ = this.AuthService.isLoggedIn();

  }

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
    this.isLoggedInSubscription = this.AuthService.isLoggedIn().subscribe(loggedIn => {
      if (loggedIn) {
        // Get user ID from token
        const userId = this.AuthService.getUserIdFromToken();
    
        // Check if movie is watched by the user
        //SYNC UP THE BOOLEAN VALUES TO WORK PROPERLY
        this.MovieService.isMovieWatched(+this.movieId!, userId).subscribe(response => {
          this.isMovieWatched = response;
        });
      }
    });
    
  }

  ngOnDestroy(): void {
    // Unsubscribe from isLoggedIn$ to avoid memory leaks
    this.isLoggedInSubscription?.unsubscribe();
  }

  markMovieAsWatched() {
    console.log("marking as watched");
    const userId = this.AuthService.getUserIdFromToken();

    if (this.movieId !== null) {
      const parsedMovieId = parseInt(this.movieId, 10); // Convert to integer
      // You can also use: const parsedMovieId = Number(this.movieId);

      this.MovieService.createWatchedMovieEntry(parsedMovieId, userId, this.rating).subscribe({
        next: response => {
          this.isMovieWatched = true;
          console.log('Watched movie entry created:', response);
        },
        error: error => {
          console.error('Error creating watched movie entry:', error);
        }
      });
    } else {
      console.error('movieId is null');
    }
}

  unmarkMovieAsWatched() {
    const userId = this.AuthService.getUserIdFromToken();

    this.MovieService.markMovieAsUnwatched(+this.movieId!, userId).subscribe({
      next: response => {
        console.log('Movie marked as unwatched:', response);
        this.isMovieWatched = false;
      },
      error: error => {
        console.error('Error marking movie as unwatched:', error);
      }
    });
  }



  getPosterUrl(posterPath: string): string {
    return this.MovieService.getPosterUrl(posterPath);
  }
}
