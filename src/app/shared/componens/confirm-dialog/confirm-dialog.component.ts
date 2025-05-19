import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  template: `
  <h2 mat-dialog-title>¿Cerrar sesión?</h2>
  <mat-dialog-content>
    <p>¿Estás seguro de que deseas cerrar sesión?</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="onCancel()">No</button>
    <button mat-button color="warn" (click)="onConfirm()">Sí</button>
  </mat-dialog-actions>
`
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
