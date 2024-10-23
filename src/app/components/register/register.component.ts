import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Person } from '../../models/person';
import { Router } from '@angular/router'; // Asegúrate de importar Router aquí

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private personService: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const person: Person = this.registerForm.value;
      this.personService.postPerson(person).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          console.error('Error al registrar:', error);
        }
      });
    }
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
