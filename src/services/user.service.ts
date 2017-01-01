import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private usersUrl = '/api/users';
    private registerUrl = this.usersUrl + '/register';
    private loginUrl = this.usersUrl + '/login';
    private logoutUrl = this.usersUrl + '/logout';
    private profileUrl = this.usersUrl + '/profile';
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

    getUserByUsername(username: string) {
        return this.http.get(this.usersUrl + '/user/' + username)
            .map((res: Response) => res.json());
    }

    getUserProfile() {
        return this.http.get(this.profileUrl)
            .map((res: Response) => res.json());
    }
}
