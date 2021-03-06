import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocalStorageModule } from 'angular-2-local-storage';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CollapseDirective } from 'ng2-bootstrap';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TourPageModule } from './components/tour-page/tour-page.module';
import { SliderComponent } from './components/slider/slider.component';
import { CreateTourPageComponent } from './components/create-tour-page/create-tour-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PublicProfilePageComponent } from './components/public-profile-page/public-profile-page.component';
import { ProfileEditPageComponent } from './components/profile-edit-page/profile-edit-page.component';

import { UserService } from './../services/user.service';

import { AuthenticationGuard } from './guards/authentication.guard';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TourPageModule,
    SimpleNotificationsModule,
    LocalStorageModule.withConfig({
            prefix: 'app-root',
            storageType: 'localStorage'
        })
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SliderComponent,
    CreateTourPageComponent,
    ProfilePageComponent,
    NavigationComponent,
    PublicProfilePageComponent,
    ProfileEditPageComponent,

    CollapseDirective
  ],
  providers: [
    FormBuilder,
    UserService,
    AuthenticationGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
