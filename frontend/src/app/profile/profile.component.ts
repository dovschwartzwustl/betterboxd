import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Movie } from '../movie';
import { MovieService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieComponent } from '../movie/movie.component';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MovieComponent, CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userId: string | null = null;
  username: string | undefined;
  watchedMovies: Movie[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private MovieService: MovieService, private UsersService: UsersService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.getWatchedMovies();
      this.getUsername();
      
    });
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

  getUsername() {
    if(this.userId != undefined) {
      this.UsersService.getUsernameFromId(this.userId).subscribe({
        next: (response) => {
          this.username = response.username;
        },
        error: (error) => {
          console.error('Error fetching username:', error);
        }
      })
    }
  }
}