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
    private placesUrl = '/api/tours/cities';
    private joinUrl = '/api/tours/join';

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.toursUrl)
            .map((res: Response) => res.json());
        // .toPromise()
        // .then(response => {
        //     let data = response.json() as ResponseResult<Tour[]>;
        //     return data.result;
        // });
    }

    getAllPlaces() {
        return this.http.get(this.placesUrl)
            .map((res: Response) => res.json());
        // .toPromise()
        // .then(response => {
        //     let data = response.json() as ResponseResult<Tour[]>;
        //     return data.result;
        // });
    }

    getTourDetailsById(id: string) {
        return this.http.get(this.toursUrlById + id)
            .map((res: Response) => res.json());
        // .toPromise()
        // .then(response => {
        //     let data = response.json() as ResponseResult<Tour>;
        //     return data.result;
        // });
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

    publicateTour(Tour: any) {
        return this.http.post(this.toursUrl, Tour);
    }

    publishComment(params: any) {
        return this.http.post(this.toursUrlById + params.tourId.id + '/comments', params)
            .map((res: Response) => res.json());
    }

    joinTo(tourId: String, user: string, toJoin) {
       // console.log(tourId + '/' + user);
        return this.http.post(this.joinUrl, { tourId, user, toJoin })
         .map((res: Response) => res.json());
    }

    lastTours() {
        return this.http.get(this.toursUrl + '/last')
            .map((res: Response) => res.json());
    }
};
