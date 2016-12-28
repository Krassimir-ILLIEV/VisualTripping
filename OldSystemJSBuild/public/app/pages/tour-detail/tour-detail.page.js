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
var tours_service_1 = require('../../services/tours.service');
var router_1 = require('@angular/router');
var TourDetailPage = (function () {
    //listFilter: string;
    function TourDetailPage(toursData, _route, _router) {
        this.toursData = toursData;
        this._route = _route;
        this._router = _router;
        this.tour = {};
    }
    TourDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.getTour(id);
        });
        // this.sub = this._route.params.subscribe(
        //     params => {
        //         let id = +params['id'];
        //         this.getTour(id);
        //     });
    };
    TourDetailPage.prototype.ngOnDestroy = function () {
        // this.sub.unsubscribe();
    };
    TourDetailPage.prototype.onBack = function () {
        this._router.navigate(['/tours']);
    };
    TourDetailPage.prototype.getTour = function (id) {
        var _this = this;
        this.toursData.getTourDetailsById(id)
            .then(function (tour) {
            _this.tour = tour;
        });
    };
    TourDetailPage = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './tour-detail.page.html'
        }), 
        __metadata('design:paramtypes', [tours_service_1.ToursService, router_1.ActivatedRoute, router_1.Router])
    ], TourDetailPage);
    return TourDetailPage;
}());
exports.TourDetailPage = TourDetailPage;
//# sourceMappingURL=tour-detail.page.js.map