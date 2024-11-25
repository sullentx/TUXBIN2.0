import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-section-home',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './section-home.component.html',
  styleUrl: './section-home.component.scss'
})
export class SectionHomeComponent {

}
