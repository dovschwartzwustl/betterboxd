import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  userId: string | null = null;
  followers: User[] = [];

  constructor(private route: ActivatedRoute, private UsersService: UsersService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.UsersService.getFollowers(this.userId!).subscribe({
        next: (response) => {
          this.followers = response;
        },
        error: (error) => {
          console.error('Error fetching followers:', error);
        }
      });
    });
  }
}
