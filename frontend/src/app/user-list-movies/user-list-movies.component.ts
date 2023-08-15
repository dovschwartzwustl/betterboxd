import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserList } from '../user-list';
import { ActivatedRoute } from '@angular/router';
import { RouterModule} from '@angular/router';
import { UsersService } from '../users.service';
import { Movie } from '../movie';
import { MovieComponent } from '../movie/movie.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list-movies',
  standalone: true,
  imports: [MovieComponent, RouterModule, CommonModule],
  templateUrl: './user-list-movies.component.html',
  styleUrls: ['./user-list-movies.component.scss']
})

export class UserListMoviesComponent implements OnInit {
  listId: string | null = null;
  userId: string | null = null;
  listInfo: UserList = { id: 0, name: '' };
  movies: Movie[] = [];
  isMyProfile: boolean = false;
  isLoggedIn: boolean = false;
  private isLoggedInSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(parentParams => {
      this.userId = parentParams.get('userId');
      this.isLoggedInSubscription = this.authService.isLoggedIn().subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
        if (loggedIn) {
          const authenticatedUserId = this.authService.getUserIdFromToken(); // Assuming you already have a method for this
  
          // Check if the profile is the same as the authenticated user's profile
          
          if(this.userId != null) {
            const userIdNum = parseInt(this.userId, 10);
            this.isMyProfile = userIdNum === authenticatedUserId;
          }
        }
      });
    });

    this.route.params.subscribe(params => {
      this.listId = params['listId'];

      if (this.userId && this.listId) {
        this.usersService.getListById(this.userId, this.listId).subscribe({
          next: (response: any) => {
            this.listInfo = { id: response.list.id, name: response.list.name };
            this.movies = response.movies;
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
}

