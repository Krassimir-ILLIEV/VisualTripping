import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
    public images: any[];

    constructor() {
        this.images = [];
    }

    ngOnInit() {
        this.images = [
            { 'title': 'zero', 'id': 0, 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
            { 'title': 'first', 'id': 1, 'url': 'http://www.pixelstalk.net/wp-content/uploads/2015/01/blue-crescent-moon-wallpaper-free-download-620x349.png' },
            { 'title': 'second', 'id': 2, 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
            { 'title': 'third', 'id': 3, 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
            { 'title': 'fourth', 'id': 4, 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
        ];
    }
}
