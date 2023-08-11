import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserList } from '../user-list';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() list!: UserList;

  constructor(private route: ActivatedRoute, private router: Router) {}


  navigateToUserListMovies(list: UserList): void {
    this.router.navigate(['lists', list.id], { relativeTo: this.route, state: { list } });
  }
}
