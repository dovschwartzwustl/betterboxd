import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
