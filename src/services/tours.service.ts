import { ResponseResult } from '../models/response-result.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Tour } from '../models/tour.model';

@Injectable()
export class ToursService {
    private toursUrl = '/api/tours';
    private toursUrlById = '/api/tours/';
    constructor(private http: Http) { }

    getAll(): Promise<Tour[]> {
        return this.http.get(this.toursUrl)
            .toPromise()
            .then(response => {
                let data = response.json() as ResponseResult<Tour[]>;
                return data.result;
            });
    }

    getTourDetailsById(id: number): Promise<Tour> {
        return this.http.get(this.toursUrlById + id)
            .toPromise()
            .then(response => {
                let data = response.json() as ResponseResult<Tour>;
                return data.result;
            });
    }

    // getTourDetailsById(id: number): Observable<Tour> {
    //     return this.http.get(this.toursUrlById + id)
    //         .map((response: Response) => <Tour>response.json())
    //         .catch(this.handleError);
    // };

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
};
