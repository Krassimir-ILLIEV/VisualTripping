import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './register-page.component.html'
})
export class RegisterPageComponent implements OnInit {
    public user: FormGroup;

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        this.user = this.fb.group({
            'username': ['',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    Validators.pattern('[A-Za-z0-9]{4,}$')
                ])
            ],
            'fullname': ['',
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
                    Validators.minLength(6),
                    Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')
                ])
            ]
        });
    }

    register() {
        console.log("Registering... More like selling your soul to the Devil");
    }
}
