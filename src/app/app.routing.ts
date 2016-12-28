import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Route[] = [
  { path: 'home', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
