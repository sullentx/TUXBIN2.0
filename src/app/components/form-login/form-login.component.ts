import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { PersonLog } from '../../models/person';
import { Router } from '@angular/router'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/localStorage.Service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss', './style.scss'],
  imports: [ReactiveFormsModule, CommonModule, MatProgressBarModule, MatSnackBarModule]
})
export class FormLoginComponent {
  isLoading = false;
  loginForm: FormGroup;
  isRegisterMode: boolean = true;

  constructor(
    private fb: FormBuilder,
    private personService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private local:LocalStorageService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true; 
      const personlog: PersonLog = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      setTimeout(() => {
        this.personService.postLogin(personlog).subscribe({
          next: () => {
            const rol= this.local.getItem('rol')
            if(rol == '1'){
              this.router.navigate(['/adminHome']);
              this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
                duration: 3000, 
              });
              this.isLoading = false; 
            }else if(rol== '2'){
              this.router.navigate(['/home']);
              this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
                duration: 3000, 
              });
            }
          },
          error: (err) => {
            this.snackBar.open('Error en el inicio de sesión. Por favor, comprueba tus credenciales.', 'Cerrar', {
              duration: 3000,
            });
            this.isLoading = false; 
          },
          complete: () => {
            this.isLoading = false; 
          }
        });
      }, 2000); 
    } else {
      this.snackBar.open('Por favor, completa el formulario correctamente.', 'Cerrar', {
        duration: 3000, 
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/register']);
  }
}
