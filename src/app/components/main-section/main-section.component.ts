import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormLoginComponent } from "../form-login/form-login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [HeaderComponent, FormLoginComponent, RegisterComponent],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss'
})
export class MainSectionComponent {

}
