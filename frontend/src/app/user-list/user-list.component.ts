import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() isSelectedInput = false; 
  @Output() listSelected = new EventEmitter<number>();
  isSelected: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router) {}


  navigateToList(listId: number) {
    // Assuming you have the `list` object in your component
    const list = this.list;
  
    // Navigate to the route with queryParams
    this.router.navigate(['/lists', listId], { queryParams: { list: JSON.stringify(list) } });
  }

  selectList(listId: number): void {
    this.listSelected.emit(listId);
  }


}
