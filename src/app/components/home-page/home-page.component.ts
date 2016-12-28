import { Component } from '@angular/core';

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
    public images = IMAGES;
}

const IMAGES: any[] = [
    { 'title': 'first', 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
    { 'title': '2', 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
    { 'title': '3', 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
    { 'title': '4', 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
    { 'title': '5', 'url': 'http://www.intrawallpaper.com/static/images/wallpaper-photos-17.jpg' },
];
