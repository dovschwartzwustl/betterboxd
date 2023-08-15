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
  selector: 'app-list-edit',
  standalone: true,
  imports: [MovieComponent, SearchResultsComponent, FormsModule, CommonModule],
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent {
  userId: string | null = null;
  listId: string | null = null;
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
    });
  
    this.route.paramMap.subscribe(params => {
      this.listId = params.get('listId');
      if (this.userId && this.listId) {
        this.UsersService.getListById(this.userId, this.listId).subscribe({
          next: (response: any) => {
            this.listName = response.list.name;
            this.selectedMovies = response.movies;
          },
          error: (error) => {
            console.error('Error fetching list:', error);
          }
        });
      }
    });
  }  

  ngOnDestroy(): void {
    this.isLoggedInSubscription?.unsubscribe();
  }

  onEditListSubmit() {
    if (this.userId && this.listId && this.listName) {
      this.UsersService.updateList(this.listId, this.listName, this.description).subscribe({
        next: () => {
          const listItems: any[] = [];

          this.selectedMovies.forEach(movie => {
            listItems.push({ movie_list_id: this.listId, movie_id: movie.id });
          });
          if(this.listId) {
            this.UsersService.updateListItems(this.listId, listItems).subscribe({
            next: () => {
              console.log('List updated and movies added/removed:');
              this.router.navigate(['profile', this.userId, 'lists']);
            },
            error: (error) => {
              console.error('Error updating list items:', error);
            }
          });
          }
        },
        error: (error) => {
          console.error('Error updating list:', error);
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
