import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Movie } from '../movie';
import { MovieService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieComponent } from '../movie/movie.component';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MovieComponent, CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userId: string | null = null;
  username: string | undefined;
  watchedMovies: Movie[] = [];
  isFollowing: boolean = false; 
  isMyProfile: boolean = false;
  isLoggedIn: boolean = false;
  private isLoggedInSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private authService: AuthService, private MovieService: MovieService, private UsersService: UsersService) { 
    
  }

  ngOnInit(): void {
    // Getting the user's watched movies and username
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.getWatchedMovies();
      this.getUsername();
  
      this.isLoggedInSubscription = this.authService.isLoggedIn().subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
        if (loggedIn) {
          const authenticatedUserId = this.authService.getUserIdFromToken(); // Assuming you already have a method for this
  
          // Check if the profile is the same as the authenticated user's profile
          
          if(this.userId != null) {
            const userIdNum = parseInt(this.userId, 10);
            this.isMyProfile = userIdNum === authenticatedUserId;
          }
          
  
          if (!this.isMyProfile) {
            // Check if current user is following the profile user
            this.UsersService.isFollowingUser(this.userId!).subscribe({
              next: (isFollowing) => {
                this.isFollowing = isFollowing;
              },
              error: (error) => {
                console.error('Error checking if user is following:', error);
              },
            });
          }
        }
      });
    });
  }
  

  ngOnDestroy(): void {
    this.isLoggedInSubscription?.unsubscribe();
  }

  getWatchedMovies() {
    if(this.userId != undefined) {
      this.MovieService.getMoviesWatchedByUser(this.userId).subscribe({
      next: (response) => {
        this.watchedMovies = response; // Assign the 'results' array to the 'movies' property
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
    }
    

  }

  getUsername() {
    if(this.userId != undefined) {
      this.UsersService.getUsernameFromId(this.userId).subscribe({
        next: (response) => {
          this.username = response.username;
        },
        error: (error) => {
          console.error('Error fetching username:', error);
        }
      })
    }
  }

  toggleFollowUser() {
    if (this.isLoggedIn && this.userId) {
      if (this.isFollowing) {
        // Unfollow the user
        this.UsersService.unfollowUser(this.userId).subscribe({
          next: () => {
            this.isFollowing = false;
          },
          error: (error) => {
            console.error('Error unfollowing user:', error);
          },
        });
      } else {
        // Follow the user
        this.UsersService.followUser(this.userId).subscribe({
          next: () => {
            this.isFollowing = true;
          },
          error: (error) => {
            console.error('Error following user:', error);
          },
        });
      }
    }
  }
  
}