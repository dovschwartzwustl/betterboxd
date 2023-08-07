import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../movie';
import { MovieService } from '../movies.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  @Input() movie!: Movie;

  constructor(private MovieService: MovieService) {}


  getPosterUrl(posterPath: string): string {
    return this.MovieService.getPosterUrl(posterPath);
  }
}
