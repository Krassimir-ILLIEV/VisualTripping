import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private userUrl = '/api/user';
    constructor(private http: Http) { }

    register(user: any) {
        return this.http.post(this.userUrl, user);
    }
}
