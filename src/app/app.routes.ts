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
import { MapComponent } from './components/map/map.component';
import { MapUserComponent } from './components/map-user/map-user.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { ShowNotificationComponent } from './components/show-notification/show-notification.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'register', component: MainSectionTwoComponent }, 
  { path: 'login', component: MainSectionComponent }, 
  { path: 'camiones', component: MainSectionCrudComponent, canActivate: [AuthGuard] }, 
  { path: 'adminHome', component: HomeAdminComponent, canActivate: [AuthGuard] },
  { path: 'notificaciones', component: SectionCrudNotificacionesComponent, canActivate: [AuthGuard] },
  { path: 'informacion', component: SectionCrudInformacionComponent },
  { path: 'home', component: SectionHomeComponent },
  { path: 'somosTuxbin', component: SectionNosotrosComponent},
  { path: 'TuxBinInformate', component:ContentPageComponent },
  { path: 'TuxMapaAdmin', component:MapComponent, canActivate: [AuthGuard],},
  { path: 'TuxMapa', component:MapUserComponent, canActivate: [AuthGuard],},
  { path: 'TuxRutas', component:RutasComponent, canActivate: [AuthGuard],},
  {path:'ASDASDADASDASDASD12', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'ASDASDADASDASDASD12',component: HeaderAdminComponent, canActivate: [AuthGuard] },
  { path: 'ASDASDADASDASDASD12',component: ShowNotificationComponent, canActivate: [AuthGuard] },





  { path: '**', redirectTo: 'login' } 
];

