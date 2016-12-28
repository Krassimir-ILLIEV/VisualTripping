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
var superheroes_service_1 = require('./services/superheroes.service');
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(superheroesData) {
        this.superheroesData = superheroesData;
        this.superheroes = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.superheroesData.getAll()
            .then(function (superheroes) {
            _this.superheroes = superheroes;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <ul>\n    <li *ngFor=\"let superhero of superheroes\">\n      {{superhero.name}}\n    </li>\n  </ul>",
            providers: [superheroes_service_1.SuperheroesService]
        }), 
        __metadata('design:paramtypes', [superheroes_service_1.SuperheroesService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map