import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CollapseDirective } from 'ng2-bootstrap';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TourPageModule } from './components/tour-page/tour-page.module';
import { SliderComponent } from './components/slider/slider.component';
import { CreateTourPageComponent } from './components/create-tour-page/create-tour-page.component';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TourPageModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SliderComponent,
    CreateTourPageComponent,

    CollapseDirective
  ],
  providers: [FormBuilder],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
