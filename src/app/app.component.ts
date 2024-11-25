import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { LocationModule } from './services/interceptor/location.module';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
    RouterOutlet,
    MatDialogModule,
    LocationModule,

],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
    title = 'TUXBIN';
}
