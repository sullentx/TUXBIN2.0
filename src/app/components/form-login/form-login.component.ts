import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Person, PersonLog } from '../../models/person';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-form-login',
  standalone: true,
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})

export class FormLoginComponent {
  loginForm: FormGroup;
  isRegisterMode: boolean = true;
  constructor(private fb: FormBuilder, private personService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const personlog: PersonLog = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.personService.postLogin(personlog).subscribe({
        next: (response) => {
          console.log('Inicio de sesión:', response);
          localStorage.setItem('token', response.token); // Guarda el token
          this.router.navigate(['/camiones']);
        },
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/register']);
  }


}



