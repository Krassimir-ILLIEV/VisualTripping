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
        this.userService.getUserProfile()
            .subscribe(res => {
                this.user = res.user;
                this.user.avatar = this.user.avatar ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png';
            });
    }
}
