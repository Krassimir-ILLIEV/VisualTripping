import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';

@Component({
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
    user: {
        username: string,
        firstname: string,
        lastname: string,
        email: string,
        avatar: string,
        userOfferTours: any[]
    };

    constructor(private userService: UserService) {
        this.user = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            avatar: '',
            userOfferTours: []
        };
    }

    ngOnInit() {
        //for testing purposes
        //default avatar -> https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png
        // this.user = {
        //     username: 'pesho',
        //     firstname: 'Pesho',
        //     lastname: 'Peshev',
        //     email: 'peshopicha@picha.bg',
        //     avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png',
        //     userOfferTours: [
        //         {
        //             "tourId": "586844d44e287980f6968ea8",
        //             "tourTitle": "New Years Event in Berlin!",
        //             "tourCountry": "Germany",
        //             "tourCity": "Berlin"
        //         },
        //         {
        //             "tourId": "586845054e287980f6968ea9",
        //             "tourTitle": "Frankreich",
        //             "tourCountry": "Germany",
        //             "tourCity": "Paris"
        //         },
        //         {
        //             "tourId": "586845144e287980f6968eaa",
        //             "tourTitle": "Sofia",
        //             "tourCountry": "Bulgaria",
        //             "tourCity": "Sofia"
        //         }
        //     ]
        // };

        this.userService.getUserProfile()
            .subscribe(res => {
                this.user = res.user;
                this.user.avatar = this.user.avatar ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png';
            });
    }
}
