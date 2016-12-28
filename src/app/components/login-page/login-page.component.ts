import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
    public user: FormGroup;

    constructor(private fb: FormBuilder) { }

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
                    Validators.minLength(6),
                    Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')
                ])
            ],
        });
    }

    login(): void {
        console.log(this.user.controls);
        console.log('login');
        //call the auth service to login the user
    }
}
