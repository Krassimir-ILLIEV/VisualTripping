import { Component, DoCheck } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'vt-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements DoCheck {
    public isCollapsed: boolean = true;
    isLogged;

    constructor(private userService: UserService,
        private notificationsService: NotificationsService) { }

    ngDoCheck() {
        this.isLogged = this.userService.isLogged();
    }

    logout() {
        this.userService.logout()
            .then(res => {
                if (res.success) {
                    this.notificationsService.success(
                        res.message,
                        ''
                    );
                } else {
                    this.notificationsService.error(
                        res.message,
                        ''
                    );
                }
            });
    }
}
