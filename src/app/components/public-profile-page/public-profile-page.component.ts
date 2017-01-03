import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './../../../services/user.service';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './public-profile-page.component.html'
})
export class PublicProfilePageComponent implements OnInit {
    private user;
    constructor(private userService: UserService,
        private route: ActivatedRoute) {
        this.user = {
            username: '',
            firstname: '',
            lastname: '',
            avatar: '',
            userOfferTours: []
        };
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                let username = params;
                return this.userService.getUserByUsername(username['username']);
            })
            .subscribe(res => this.user = res);
    }
}
