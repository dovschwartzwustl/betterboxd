import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UserList } from '../user-list';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-movie-list-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movie-list-modal.component.html',
  styleUrls: ['./movie-list-modal.component.scss']
})
export class MovieListModalComponent implements OnInit{
  @Input() userLists: UserList[] = [];
  @Output() movieAddedToList = new EventEmitter<number>();
  @Output() movieAddedToNewList = new EventEmitter<string>();
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(private UsersService: UsersService) {}

  selectedListId: number | undefined;
  newListName: string = '';

  ngOnInit(): void {}

  onAddMovieToList() {
    this.movieAddedToList.emit(this.selectedListId);
    this.confirmed.emit(true);
  }

  onCreateNewListWithMovie() {
    this.movieAddedToNewList.emit(this.newListName);
    this.confirmed.emit(true);
  }

  onClose(): void {
    this.confirmed.emit(false);
  }
}
