import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Route[] = [
  { path: 'home', component: HomePageComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
