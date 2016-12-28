import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CollapseDirective } from 'ng2-bootstrap';

import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,

    CollapseDirective
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
