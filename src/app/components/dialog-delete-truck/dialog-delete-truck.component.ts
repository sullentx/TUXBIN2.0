import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Truck } from '../../models/truck';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-delete-truck',
  templateUrl: './dialog-delete-truck.component.html',
  styleUrls: ['./dialog-delete-truck.component.scss'],
  standalone: true,
  imports: [MatDialogContent,MatDialogActions]  
})
export class DialogDeleteTruckComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteTruckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Truck // Recibiendo datos del camión
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(this.data); 
  }
}
