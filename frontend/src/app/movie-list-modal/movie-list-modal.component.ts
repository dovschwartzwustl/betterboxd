import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UserList } from '../user-list';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-movie-list-modal',
  standalone: true,
  imports: [UserListComponent, FormsModule, CommonModule],
  templateUrl: './movie-list-modal.component.html',
  styleUrls: ['./movie-list-modal.component.scss']
})
export class MovieListModalComponent implements OnInit{
  @Input() userLists: UserList[] = [];
  userId: string | null = null;
  @Input() movieId: string | null = null;
  @Input() isLoggedIn$!: Observable<boolean>;
  @Output() movieAddedToList = new EventEmitter<number>();
  @Output() movieAddedToNewList = new EventEmitter<string>();
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() listSelected = new EventEmitter<number>();
  selectedListId: number | undefined;
  newListName: string = '';


  constructor(private UsersService: UsersService, private AuthService: AuthService, private router: Router) {

  }



  ngOnInit(): void {
    this.userId = this.AuthService.getUserIdFromToken().toString();
    if (this.userId) {
      this.UsersService.getUserLists(this.userId).subscribe({
        next: (response: any[]) => {
          this.userLists = response.map(item => {
            return { id: item.id, name: item.list_name };
          });
        },
        error: (error) => {
          console.error('Error fetching user lists:', error);
        }
      });
    }

    console.log("modal: user: "+ this.userId + ", movie: "+ this.movieId);
  }

  onListSelected(listId: number) {
    console.log("Selected list:", listId);
  
    // Store the selected list ID in the component property
    this.selectedListId = listId;
  }



  onAddMovieToList() {
    const listItem = {
      movie_list_id: this.selectedListId,
      movie_id: this.movieId, // Replace with the actual movie ID
    };

    this.UsersService.addMovieToList(listItem).subscribe({
      next: (response) => {
        console.log('Movie added to list:', response);
        this.confirmed.emit(true);
        this.router.navigate(['profile', this.userId, 'lists', this.selectedListId]);

      },
      error: (error) => {
        console.error('Error adding movie to list:', error);
      },
    });
  }

  onCreateNewListWithMovie() {
    // Create a new list with the provided name
    if(this.userId) {
      this.UsersService.createList(this.newListName, this.userId).subscribe({
      next: (response) => {
        console.log('New list created:', response);
        
        // Get the ID of the newly created list
        const newListId = response.listId;
  
        // Add the movie to the newly created list
        const listItem = {
          movie_list_id: newListId,
          movie_id: this.movieId, // Replace with the actual movie ID
        };
  
        this.UsersService.addMovieToList(listItem).subscribe({
          next: (response) => {
            console.log('Movie added to new list:', response);
            this.confirmed.emit(true);
  
            // Navigate to the new list's route
            this.router.navigate(['profile', this.userId, 'lists', newListId]);
          },
          error: (error) => {
            console.error('Error adding movie to new list:', error);
          },
        });
      },
        error: (error) => {
          console.error('Error creating new list:', error);
        },
      });
    }
    
  }
  

  onClose(): void {
    this.confirmed.emit(true);
  }
}
