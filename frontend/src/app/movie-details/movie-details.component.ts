import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies.service';
import { Movie } from '../movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {
  movieId: string | null = null;
  movie: Movie | undefined;

  constructor(private route: ActivatedRoute, private MovieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      if (this.movieId) {
        //use the movieId to fetch movie details from the service
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


    //check if the movie has been watched by the user or not if the user is logged in
    //isWatched

  }

  getPosterUrl(posterPath: string): string {
    return this.MovieService.getPosterUrl(posterPath);
  }


  //markAsWatched
}