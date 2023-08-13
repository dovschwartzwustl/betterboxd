import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserList } from '../user-list';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list-movies.component.html',
  styleUrls: ['./user-list-movies.component.scss']
})
export class UserListMoviesComponent implements OnInit {
  listId: string | null = null;
  userId: string | null = null;
  list: UserList = { id: 0, name: '' };

  constructor(private route: ActivatedRoute, private usersService: UsersService) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(parentParams => {
      this.userId = parentParams.get('userId');
      
    });

    this.route.params.subscribe(params => {
      this.listId = params['listId'];

      console.log('userId:', this.userId);
      console.log('listId:', this.listId);

      // Fetch the list data using your UsersService
      if (this.userId && this.listId) {
        this.usersService.getListById(this.userId, this.listId).subscribe({
          next: (response: any) => {
            this.list = { id: response.id, name: response.list_name };
          },
          error: (error) => {
            console.error('Error fetching list:', error);
          }
        });
      }
      
      
    });
  }
}
