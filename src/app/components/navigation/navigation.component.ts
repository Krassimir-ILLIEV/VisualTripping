import { Component, DoCheck } from '@angular/core';
import { UserService } from './../../../services/user.service';

@Component({
    selector: 'vt-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements DoCheck {
    public isCollapsed: boolean = true;
    isLogged;

    constructor(private userService: UserService) { }

    ngDoCheck() {
        this.isLogged = this.userService.isLogged();
    }

    logout() {
        this.userService.logout()
            .then(msg => console.log(msg));
    }
}
