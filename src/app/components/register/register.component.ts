import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Person } from '../../models/person';
import { Router } from '@angular/router'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss','./style.scss'],
  imports: [ReactiveFormsModule,MatProgressBarModule, MatSnackBarModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private personService: ApiService, private router: Router,private snackBar:MatSnackBar) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
 
  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true; // Mostrar la barra de carga
      const person: Person = this.registerForm.value;
      person.create_by = person.correo;
      person.id_rol = 2;
      person.create_at = new Date();

      // Simular un retraso artificial
      setTimeout(() => {
        this.personService.postPerson(person).subscribe({
          next: (response) => {
            this.snackBar.open('Te Registraste Correctamente', 'Cerrar', { duration: 3000, });
            this.router.navigate(['/login']); 
          },
          error: (error) => {
          this.snackBar.open('Ocurrió un error al registrarse. Por favor, inténtalo de nuevo.', 'Cerrar', { duration: 3000,});
          },
          complete: () => {
            this.isLoading = false; // Ocultar la barra de carga
          }
        });
      }, 2500); // Retraso de 2 segundos
    }
    else if(this.registerForm.invalid){ this.snackBar.open('Por favor, completa el formulario correctamente.', 'Cerrar', { duration: 3000, });
  }

}
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}





