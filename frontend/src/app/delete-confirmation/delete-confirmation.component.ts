import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() cancelled = new EventEmitter<boolean>();

  onConfirm() {
    this.confirmed.emit(true);
    this.cancelled.emit(false);
  }

  onCancel() {
    this.confirmed.emit(false);
    this.cancelled.emit(true);
  }
}
