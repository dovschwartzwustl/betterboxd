import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-search-input.component.html',
  styleUrls: ['./user-search-input.component.scss']
})
export class UserSearchInputComponent {
  query: string = '';


}
