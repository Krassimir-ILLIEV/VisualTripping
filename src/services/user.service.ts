import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class UserService {
    private registerUrl = '/api/user/register';
    private loginUrl = 'api/user/login';
    constructor(private http: Http,
        private localStorageService: LocalStorageService) { }

    register(user: any) {
        return this.http.post(this.registerUrl, user);
    }

    login(user: any) {
        return this.http.post(this.loginUrl, user);
    }

    isLogged() {
        let user = this.localStorageService.get('username');

        return user ? user : null;
    }
}
