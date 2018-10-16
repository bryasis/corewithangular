import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { AccessApp } from './access.app';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AccessApp] },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateComponent },
  { path: '*', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
