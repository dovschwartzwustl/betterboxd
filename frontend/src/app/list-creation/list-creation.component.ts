import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MovieService } from '../movies.service';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { MovieComponent } from '../movie/movie.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-creation',
  standalone: true,
  imports: [MovieComponent, SearchResultsComponent, FormsModule, CommonModule],
  templateUrl: './list-creation.component.html',
  styleUrls: ['./list-creation.component.scss']
})
export class ListCreationComponent implements OnInit{
  userId: string | null = null;
  listName: string|null =null;
  description: string|undefined =undefined;
  searchQuery: string|null= null;
  searchResults: Movie[]=[];
  selectedMovies: Movie[]=[];
  isLoggedIn: boolean = false;
  private isLoggedInSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private MovieService: MovieService, private UsersService: UsersService) {}


  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.userId = this.authService.getUserIdFromToken().toString();
      console.log("new list for user "+ this.userId);
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription?.unsubscribe();
  }

  onCreateListSubmit() {
    if (this.userId && this.listName) {
      this.UsersService.createList(this.listName, this.userId, this.description).subscribe({
        next: (response: any) => {
          const newListId = response.listId;
          const listItems: any[] = [];
  
          this.selectedMovies.forEach(movie => {
            listItems.push({ movie_list_id: newListId, movie_id: movie.id });
          });
  
          this.UsersService.addMoviesToList(listItems).subscribe({
            next: (result: any) => {
              console.log('List created and movies added:');
              this.router.navigate(['profile', this.userId, 'lists']);
            },
            error: (error) => {
              console.error('Error adding movies to list:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error creating list:', error);
        }
      });
    }
  }
  
  
  

  onMovieSearch() {
    if(this.searchQuery) {
      this.MovieService.getSearchResults(this.searchQuery).subscribe({
      next: (movies: Movie[]) => {
        this.searchResults = movies;
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
      }
    });
    }
    
  }

  onMovieSelect(movie: Movie) {
    if (!this.selectedMovies.some(selectedMovie => selectedMovie.id === movie.id)) {
      this.selectedMovies.push(movie);
    }
    console.log(this.selectedMovies);
    this.searchQuery='';
    this.searchResults=[];
  }

  removeSelectedMovie(movie: Movie) {
    const index = this.selectedMovies.findIndex(selectedMovie => selectedMovie.id === movie.id);
    if (index !== -1) {
      this.selectedMovies.splice(index, 1);
    }
  }

  getPosterUrl(posterPath: string): string {
    return this.MovieService.getPosterUrl(posterPath);
  }
}
