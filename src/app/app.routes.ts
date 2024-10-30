import { Routes } from '@angular/router';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { MainSectionCrudComponent } from './components/main-section-crud/main-section-crud.component';
import { MainSectionTwoComponent } from './components/main-section-two/main-section-two.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { CrudNotificacionesComponent } from './components/crud-notificaciones/crud-notificaciones.component';
import { SectionCrudNotificacionesComponent } from './components/section-crud-notificaciones/section-crud-notificaciones.component';
import { SectionCrudInformacionComponent } from './components/section-crud-informacion/section-crud-informacion.component';

export const routes: Routes = [
    { path: '', component: MainSectionTwoComponent }, 
  { path: 'register', component: MainSectionTwoComponent }, 
  { path: 'login', component: MainSectionComponent }, 
  { path: 'camiones', component: MainSectionCrudComponent }, 
  { path: 'adminHome', component: HomeAdminComponent },
  { path: 'notificaciones', component: SectionCrudNotificacionesComponent },
  { path: 'informacion', component: SectionCrudInformacionComponent },
]
