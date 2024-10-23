import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Truck } from '../models/truck';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-details-truck',
  standalone: true,
  imports: [MatDialogContent,MatDialogActions],
  templateUrl: './dialog-details-truck.component.html',
  styleUrl: './dialog-details-truck.component.scss'
})
export class DialogDetailsTruckComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDetailsTruckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Truck
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
