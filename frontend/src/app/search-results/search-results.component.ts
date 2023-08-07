import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../movie';
import { MovieService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {

  searchResults: Movie[] = [];
  
  constructor(private route: ActivatedRoute, private MovieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const searchTerm = params.get('searchTerm');
      if (searchTerm) {
        // Fetch search results using your shared service
        //this.searchResults = this.MovieService.getSearchResults(searchTerm);
      }
    });
  }

  

}
