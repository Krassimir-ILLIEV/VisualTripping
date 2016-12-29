import { Component, Input } from '@angular/core';

@Component({
    selector: 'vt-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent {
    images: any[] = [];

    @Input('images') set imagesArr(images: any){
        this.images = images;
        console.log(this.images);
    }
}
