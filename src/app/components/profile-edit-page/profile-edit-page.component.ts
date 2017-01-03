import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    templateUrl: './profile-edit-page.component.html'
})
export class ProfileEditPageComponent implements OnInit {
    private editForm: FormGroup;
    private user: any;
    private userAvatar: string;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private notificationsService: NotificationsService,
        private router: Router) {
            this.user = {
                firstname: '',
                lastname: '',
                email: '',
                avatar: ''
            };

            this.userAvatar = '';
    }

    ngOnInit() {
        this.editForm = this.fb.group({
            'firstname': ['',
                Validators.compose([
                    Validators.minLength(5),
                    Validators.maxLength(50),
                    Validators.pattern('([^0-9]){5,}')
                ])
            ],
            'lastname': ['',
                Validators.compose([
                    Validators.minLength(5),
                    Validators.maxLength(50),
                    Validators.pattern('([^0-9]){5,}')
                ])
            ],
            'email': ['',
                Validators.compose([
                    Validators.minLength(5),
                    Validators.maxLength(50)
                ])
            ],
            'avatar': ['',
                Validators.compose([
                    Validators.minLength(1),
                    Validators.pattern('([jpg|png|gif|bmp]){1,}')
                ])
            ]
        });

        this.userService.getUserProfile()
            .subscribe(res => {
                this.user = res.user;
                this.userAvatar = this.user.avatar;
            });
    }

    edit() {
        let updatedUser = {
            firstname: this.editForm.value.firstname,
            lastname: this.editForm.value.lastname,
            email: this.editForm.value.email,
            avatar: this.editForm.value.avatar
        };

        this.userService.updateUserInfo(updatedUser);
    }

    avatarChange(value: string) {
        this.userAvatar = value;
    }
}
