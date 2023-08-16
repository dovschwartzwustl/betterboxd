import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserList } from '../user-list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movie-list-modal.component.html',
  styleUrls: ['./movie-list-modal.component.scss']
})
export class MovieListModalComponent {
  @Input() userLists: UserList[] = [];
  @Output() movieAddedToList = new EventEmitter<number>();
  @Output() movieAddedToNewList = new EventEmitter<string>();

  selectedListId: number | undefined;
  newListName: string = '';

  addMovieToList() {
    if (this.selectedListId) {
      this.movieAddedToList.emit(this.selectedListId);
    }
  }

  createNewListWithMovie() {
    if (this.newListName.trim() !== '') {
      this.movieAddedToNewList.emit(this.newListName);
    }
  }

  closeModal() {
    this.selectedListId = undefined;
    this.newListName = '';
  }
}
