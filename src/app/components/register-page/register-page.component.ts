import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
@Component({
    templateUrl: './register-page.component.html'
})
export class RegisterPageComponent implements OnInit {
    private registerForm: FormGroup;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private notificationsService: NotificationsService,
        private router: Router) {

    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            'username': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    Validators.pattern('[A-Za-z0-9]{4,}$')
                ])
            ],
            'firstname': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50),
                    Validators.pattern('([^0-9]){5,}')
                ])
            ],
            'lastname': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50),
                    Validators.pattern('([^0-9]){5,}')
                ])
            ],
            'email': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50),
                ])
            ],
            'password': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    // Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')
                    Validators.pattern('.{5,}$')
                ])
            ]
        });
    }

    register() {
        let firstname = this.registerForm.value.firstname;
        let lastname = this.registerForm.value.lastname;
        let username = this.registerForm.value.username;
        let email = this.registerForm.value.email;
        let password = this.registerForm.value.password;

        let user = {
            username,
            firstname: firstname,
            lastname: lastname,
            email,
            password
        };
        this.userService.register(user)
            .subscribe(res => {
                console.log(res);
                if (res.success) {
                    this.notificationsService.success(
                        res.message,
                        ''
                    );
                    this.router.navigate(['./login']);
                } else {
                    this.notificationsService.error(
                        res.message,
                        ''
                    );
                }
            });
    }
}
