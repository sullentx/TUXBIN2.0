import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Truck } from '../../models/truck';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { TruckService } from '../../services/truck.service';
@Component({
  selector: 'app-dialog-edit-truck',
  templateUrl: './dialog-edit-truck.component.html',
  styleUrls: ['./dialog-edit-truck.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule,MatDialogContent, MatDialogActions]  
})
export class DialogEditTruckComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogEditTruckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Truck, private truckService:TruckService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    this.truckService.updateTruck(this.data).subscribe({
      next: (response) => {
        console.log('Camión actualizado con éxito:', response);
        this.dialogRef.close(); 
      },
      error: (error) => {
        console.error('Error al actualizar el camión:', error);
      }
    });
  }
  onCancel():void{
    this.dialogRef.close(); 

  }
}
