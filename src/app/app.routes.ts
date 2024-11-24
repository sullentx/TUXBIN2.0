import { Routes } from '@angular/router';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { MainSectionCrudComponent } from './components/main-section-crud/main-section-crud.component';
import { MainSectionTwoComponent } from './components/main-section-two/main-section-two.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { SectionCrudNotificacionesComponent } from './components/section-crud-notificaciones/section-crud-notificaciones.component';
import { SectionCrudInformacionComponent } from './components/section-crud-informacion/section-crud-informacion.component';
import { SectionHomeComponent } from './components/section-home/section-home.component';
import { SectionNosotrosComponent } from './components/section-nosotros/section-nosotros.component';
import { AuthGuard } from './components/custom/auth.guard';
import { ContentPageComponent } from './components/content-page/content-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'register', component: MainSectionTwoComponent }, 
  { path: 'login', component: MainSectionComponent }, 
  { path: 'camiones', component: MainSectionCrudComponent, canActivate: [AuthGuard] }, 
  { path: 'adminHome', component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: 'notificaciones', component: SectionCrudNotificacionesComponent, canActivate: [AuthGuard] },
  { path: 'informacion', component: SectionCrudInformacionComponent, canActivate: [AuthGuard] },
  { path: 'home', component: SectionHomeComponent, canActivate: [AuthGuard] },
  { path: 'somosTuxbin', component: SectionNosotrosComponent, canActivate: [AuthGuard] },
  { path: 'TuxBinInformate', component:ContentPageComponent , canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' } 
];

