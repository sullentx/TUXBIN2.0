import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-section-nosotros',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './section-nosotros.component.html',
  styleUrl: './section-nosotros.component.scss'
})
export class SectionNosotrosComponent {

}
