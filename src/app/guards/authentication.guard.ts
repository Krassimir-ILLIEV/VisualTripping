import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './../../services/user.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.userService.isLogged();
        if (!currentUser) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}
