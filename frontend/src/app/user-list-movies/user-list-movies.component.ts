import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserList } from '../user-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list-movies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list-movies.component.html',
  styleUrls: ['./user-list-movies.component.scss']
})
export class UserListMoviesComponent {
  @Input() list!: UserList;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.list = data['list']; // Access the data passed from the route
      console.log(this.list);
    });
  }
}
