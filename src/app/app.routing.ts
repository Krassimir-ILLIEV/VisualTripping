import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TourPageComponent } from './components/tour-page/tour-page.component';
import { CreateTourPageComponent } from './components/create-tour-page/create-tour-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Route[] = [
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'tours', component: TourPageComponent },
  { path: 'create', component: CreateTourPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthenticationGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
