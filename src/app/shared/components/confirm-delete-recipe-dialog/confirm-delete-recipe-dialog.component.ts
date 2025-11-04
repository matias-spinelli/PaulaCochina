import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-recipe-dialog',
  standalone: false,
  templateUrl: './confirm-delete-recipe-dialog.component.html',
  styleUrl: './confirm-delete-recipe-dialog.component.css'
})
export class ConfirmDeleteRecipeDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmDeleteRecipeDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
