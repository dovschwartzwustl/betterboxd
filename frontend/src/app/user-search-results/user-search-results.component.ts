import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-search-results',
  standalone: true,
  imports: [UserComponent, CommonModule],
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.scss']
})
export class UserSearchResultsComponent {
  searchResults: User[] = [];
  query: string | null = null;

  constructor(private route: ActivatedRoute, private UsersService: UsersService) {}

  ngOnInIt(): void {
    this.searchUsers();
  }

  searchUsers() {
    if (this.query != null) {
      this.UsersService.searchUsers(this.query).subscribe({
      next: (response) => {
        this.searchResults = response.users;
      },
      error: (error) => {
        console.error('Error searching for users:', error);
      }
    });
    }
    
  }


}
