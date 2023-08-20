import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';
import { UserComponent } from '../user/user.component';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { TabService } from '../tabs.service';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [UserComponent, RouterModule, CommonModule],
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  userId: string | null = null;
  followers: User[] = [];

  constructor(private route: ActivatedRoute, private UsersService: UsersService, private tabService: TabService) { }

  ngOnInit(): void {
    this.tabService.setActiveTabIndex(0);
    this.route.parent?.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.UsersService.getFollowers(this.userId!).subscribe({
        next: (response) => {
          this.followers = response.map((item: any) => {
            return { id: item.id, username: item.username };
          });
        },
        error: (error) => {
          console.error('Error fetching followers:', error);
        }
      });
    });
  }
}
