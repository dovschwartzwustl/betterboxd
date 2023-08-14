import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Movie } from '../movie';


@Component({
  selector: 'app-list-creation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-creation.component.html',
  styleUrls: ['./list-creation.component.scss']
})
export class ListCreationComponent {

  listName: string|null =null;
  searchQuery: string|null= null;
  searchResults: Movie[]=[];
  selectedMovies: Movie[]=[];


  onCreateListSubmit() {
  }

  onMovieSearch() {
  }

  onMovieSelect(movie: Movie) {
  }

  removeSelectedMovie(movie: Movie) {
  }
}
