import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { UserList } from '../user-list';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-lists',
  standalone: true,
  imports: [UserListComponent, CommonModule, RouterModule],
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit{
  userId: string | null = null;
  userLists: UserList[] = [];

  constructor(private route: ActivatedRoute, private UsersService: UsersService) {}

  ngOnInit(): void {
    // Getting the user's watched movies and username
    this.route.parent?.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.getUserLists();
  });
}


  getUserLists() {
    if (this.userId != undefined) {
      this.UsersService.getUserLists(this.userId).subscribe({
        next: (response: any[]) => {
          this.userLists = response.map(item => {
            return { id: item.id, name: item.list_name };
          });
          console.log(this.userLists);
        },
        error: (error) => {
          console.error('Error fetching user lists:', error);
        }
      });
    }
  }
}
