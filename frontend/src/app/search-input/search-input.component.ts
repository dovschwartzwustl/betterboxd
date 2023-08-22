import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  query: string = '';

  constructor(private router: Router) {}

  onSearchEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.router.navigate(['/search', this.query]);
    }
  }
  
}
