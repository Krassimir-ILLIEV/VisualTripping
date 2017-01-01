import { Component, DoCheck } from '@angular/core';
import { UserService } from './../services/user.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  moduleId: 'module.id',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  public isCollapsed: boolean = true;
  isLogged;

  constructor(private userService: UserService) { }

  ngDoCheck() {
    this.isLogged = this.userService.isLogged();
  }
}
