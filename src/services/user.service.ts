import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private registerUrl = '/api/user/register';
    private loginUrl = 'api/user/login';
    private logoutUrl = 'api/user/logout';
    private userStorage: string = 'username';
    constructor(private http: Http,
        private localStorageService: LocalStorageService) { }

    register(user: any) {
        return this.http.post(this.registerUrl, user)
            .map((res: Response) => res.json());
    }

    login(user: any) {
        return this.http.post(this.loginUrl, user)
            .map((res: Response) => res.json());
    }

    isLogged() {
        let user = this.localStorageService.get(this.userStorage);

        return user ? user : null;
    }

    logout() {
        return this.http.get(this.logoutUrl)
            .map((res: Response) => res.json())
            .toPromise()
            .then(res => {
                if (res.success) {
                    this.localStorageService.remove(this.userStorage);
                }

                return res.message;
            });
    }
}
