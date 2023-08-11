import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movies.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieComponent, RouterModule, CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  userId: string | null = null;

  watchedMovies: Movie[] = [];

  constructor(private route: ActivatedRoute, private MovieService: MovieService) {}

  ngOnInit(): void {
    // Getting the user's watched movies and username
    this.route.parent?.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.getWatchedMovies();
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

}
