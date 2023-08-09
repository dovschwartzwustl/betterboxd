import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-search-results',
  standalone: true,
  imports: [UserComponent, CommonModule, RouterModule],
  templateUrl: './user-search-results.component.html',
  styleUrls: ['./user-search-results.component.scss']
})
export class UserSearchResultsComponent {
  searchResults: User[] = [];
  query: string | null = null;

  constructor(private route: ActivatedRoute, private UsersService: UsersService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      if (this.query !== null) {
        this.searchUsers();
      }
    });
  }

  searchUsers() {
    if (this.query != null) {
      this.UsersService.searchUsers(this.query).subscribe({
      next: (response) => {
        this.searchResults = response;
      },
      error: (error) => {
        console.error('Error searching for users:', error);
      }
    });
    }
    
  }


}
