import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { ToursService } from './../../../services/tours.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-publish-comment',
    templateUrl: './publish-comment.component.html'
})
export class PublishCommentComponent implements OnInit {
    private publishCommentForm: FormGroup;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private toursService: ToursService,
        private notificationsService: NotificationsService,
        private activatedRouter: ActivatedRoute) {

    }

    ngOnInit() {
        this.publishCommentForm = this.fb.group({
            'content': ['',
                Validators.compose([
                    Validators.minLength(4)
                ])
            ]
        });
    }

    publish() {
        let user = this.userService.isLogged();

        if (!user) {
            this.notificationsService.error(
                'Please log in to publish your comment',
                ''
            );
        } else {
            let tourId;
            this.activatedRouter.params
                .switchMap((params: Params) => {
                    tourId = params;

                    let content = this.publishCommentForm.value.content;

                    let comment = {
                        author: user,
                        content: content
                    };

                    return this.toursService.publishComment({ tourId, comment });
                })
                .subscribe(res => {
                    console.log(res);
                    if (res.success) {
                        this.notificationsService.success(
                            res.message,
                            ''
                        );
                    } else {
                        this.notificationsService.error(
                            res.message,
                            ''
                        );
                    }
                });
        }
    }
}
