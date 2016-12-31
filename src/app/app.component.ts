import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  moduleId: 'module.id',
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isCollapsed: boolean = true;
  isLogged;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.isLogged()
      .subscribe(user => {
      this.isLogged = user ? user : null;
        console.log(this.isLogged);
      });
  }
}
