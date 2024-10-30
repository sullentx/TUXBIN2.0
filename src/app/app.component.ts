import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSectionComponent } from "./components/main-section/main-section.component";
import { CrudCamionComponent } from "./components/crud-camion/crud-camion.component";
import { FormLoginComponent } from "./components/form-login/form-login.component";
import { MainSectionCrudComponent } from "./components/main-section-crud/main-section-crud.component";
import { MatTable } from '@angular/material/table';
import { MainSectionTwoComponent } from './components/main-section-two/main-section-two.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MainSectionComponent,
        MainSectionTwoComponent,
        CrudCamionComponent,
        FormLoginComponent,
        MainSectionCrudComponent,
        MatTable,
        HomeAdminComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
    title = 'TUXBIN';
}
