import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-main-section-two',
  standalone: true,
  imports: [RegisterComponent, HeaderComponent],
  templateUrl: './main-section-two.component.html',
  styleUrl: './main-section-two.component.scss'
})
export class MainSectionTwoComponent {

}
