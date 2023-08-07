import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../movie';
import { MovieService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieComponent } from '../movie/movie.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MovieComponent, CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  searchResults: Movie[] = [];
  query: string | null = null;
  

  constructor(private route: ActivatedRoute, private MovieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      if (this.query) {
        console.log("query: "+this.query);
        // Fetch search results using your shared service
        this.MovieService.getSearchResults(this.query).subscribe({
          next: (movies: Movie[]) => {
            this.searchResults = movies;
          },
          error: (error) => {
            console.error('Error fetching search results:', error);
          }
        });
        
      }
    });
  }

  

}
