"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var tours_list_page_1 = require('../../pages/tours-list/tours-list.page');
var tour_detail_module_1 = require('../../pages/tour-detail/tour-detail.module');
var tour_detail_page_1 = require('../../pages/tour-detail/tour-detail.page');
var tour_filter_pipe_1 = require('../../pages/tours-list/tour-filter.pipe');
var tours_service_1 = require('../../../app/services/tours.service');
var TourModule = (function () {
    function TourModule() {
    }
    TourModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                tour_detail_module_1.TourDetailModule,
                router_1.RouterModule.forChild([
                    { path: 'tours', component: tours_list_page_1.ToursListPage },
                    { path: 'tour/:id',
                        //canActivate: [ ProductDetailGuard],
                        component: tour_detail_page_1.TourDetailPage
                    }
                ])
            ],
            declarations: [
                tours_list_page_1.ToursListPage,
                tour_filter_pipe_1.TourFilterByKeyWordPipe
            ],
            providers: [
                tours_service_1.ToursService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TourModule);
    return TourModule;
}());
exports.TourModule = TourModule;
//# sourceMappingURL=tour.module.js.map