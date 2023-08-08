import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Movie } from '../movie';
import { MovieService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieComponent } from '../movie/movie.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MovieComponent, CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userId: number | undefined;
  username: string | undefined;
  watchedMovies: Movie[] = [];

  constructor(private authService: AuthService, private MovieService: MovieService) { }

  ngOnInit(): void {
    // Get the token from local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode the token and parse the payload
      const decodedToken = this.authService.getDecodedToken(token);
      // Access the user's ID from the payload
      this.userId = decodedToken.userId;
      this.username = decodedToken.username;
      this.getWatchedMovies();
      console.log(this.watchedMovies);
    }

    //call getWatchedMovies

  }

  getWatchedMovies() {
    if(this.userId != undefined) {
      this.MovieService.getMoviesWatchedByUser(this.userId).subscribe({
      next: (response) => {
        this.watchedMovies = response; // Assign the 'results' array to the 'movies' property
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
    }
    

  }
}