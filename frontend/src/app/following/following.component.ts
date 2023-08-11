import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';
import { UserComponent } from '../user/user.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [UserComponent, RouterModule, CommonModule],
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent {
  userId: string | null = null;
  following: User[] = [];

  constructor(private route: ActivatedRoute, private UsersService: UsersService) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.UsersService.getFollowing(this.userId!).subscribe({
        next: (response) => {
          this.following = response.map((item: any) => {
            return { id: item.id, username: item.username };
          });
          console.log(this.following);
        },
        error: (error) => {
          console.error('Error fetching following:', error);
        }
      });
    });
  }
}
