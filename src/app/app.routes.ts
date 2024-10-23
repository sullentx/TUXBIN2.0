import { Routes } from '@angular/router';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { MainSectionCrudComponent } from './components/main-section-crud/main-section-crud.component';
import { MainSectionTwoComponent } from './components/main-section-two/main-section-two.component';

export const routes: Routes = [
    { path: '', component: MainSectionTwoComponent }, 
  { path: 'register', component: MainSectionTwoComponent }, 
  { path: 'login', component: MainSectionComponent }, 
  { path: 'camiones', component: MainSectionCrudComponent }, ]
