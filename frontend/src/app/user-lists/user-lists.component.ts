import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { UserList } from '../user-list';
import { UserListComponent } from '../user-list/user-list.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { TabService } from '../tabs.service';



@Component({
  selector: 'app-user-lists',
  standalone: true,
  imports: [DeleteConfirmationComponent, UserListComponent, CommonModule, RouterModule],
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit{
  userId: string | null = null;
  userLists: UserList[] = [];
  showCreateListForm = false;
  isMyProfile: boolean = false;
  isLoggedIn: boolean = false;
  private isLoggedInSubscription: Subscription | undefined;
  private deleteListSubscription: Subscription | undefined;
  deleteConfirmationVisible = false;
  listToDeleteId: string | null = null;

  constructor(private route: ActivatedRoute, private UsersService: UsersService, private authService: AuthService, private dialog: MatDialog, private router: Router, private tabService: TabService) {}

  ngOnInit(): void {
    // Getting the user's watched movies and username
    this.tabService.setActiveTabIndex(3);
    this.route.parent?.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.getUserLists();

      this.isLoggedInSubscription = this.authService.isLoggedIn().subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
        if (loggedIn) {
          const authenticatedUserId = this.authService.getUserIdFromToken();
          
          if(this.userId != null) {
            const userIdNum = parseInt(this.userId, 10);
            this.isMyProfile = userIdNum === authenticatedUserId;
          }
        }
      });
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

  openCreateListForm() {
    this.showCreateListForm = true;
  }
  
  closeCreateListForm() {
    this.showCreateListForm = false;
  }

  openDeleteConfirmationDialog(listId: number): void {
    this.listToDeleteId = listId.toString();
    this.deleteConfirmationVisible = true;
  }

  onDeleteConfirmed(confirmed: boolean): void {
    if (confirmed && this.listToDeleteId && this.userId) {
      // Perform the deletion logic here
      this.deleteListSubscription = this.UsersService.deleteList(this.userId, this.listToDeleteId).subscribe({
        next: () => {
          this.listToDeleteId = null;
          this.deleteConfirmationVisible = false;
          this.getUserLists();
        },
        error: (error) => {
          console.error('Error deleting list:', error);
        }
      });
    } else {
      this.listToDeleteId = null;
      this.deleteConfirmationVisible = false;
    }
  }
  
  ngOnDestroy(): void {
    this.deleteListSubscription?.unsubscribe();
  }
  
  

  
}
