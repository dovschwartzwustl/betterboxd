import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-list-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-list-form.component.html',
  styleUrls: ['./create-list-form.component.scss']
})
export class CreateListFormComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  listName: string = '';

  onClose() {
    this.close.emit();
  }

  createList() {

  }
}
