import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
    public user: FormGroup;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.user = this.fb.group({
            'username': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    Validators.pattern('[A-Za-z0-9]{4,}')
                ])
            ],
            'password': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(5),
                    Validators.pattern('.{5,}$')
                    // Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')
                ])
            ],
        });
    }

    login(): void {
        console.log(this.user.value);
        console.log('login');
        //call the auth service to login the user
        this.userService.login(this.user.value)
            .subscribe(res => {
                this.localStorageService.set('username', this.user.value.username);
                console.log(this.localStorageService.get('username'));
                console.log(res);
            });
    }
}
