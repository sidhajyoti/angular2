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
var login_1 = require('./login');
var loginFormComponent = (function () {
    function loginFormComponent() {
        this.powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
        this.model = new login_1.login(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
        this.submitted = false;
        // Reset the form with a new login AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        this.active = true;
    }
    loginFormComponent.prototype.onSubmit = function () { this.submitted = true; };
    Object.defineProperty(loginFormComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    loginFormComponent.prototype.newlogin = function () {
        var _this = this;
        this.model = new login_1.login(42, '', '');
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    //////// NOT SHOWN IN DOCS ////////
    // Reveal in html:
    //   Name via form.controls = {{showFormControls(loginForm)}}
    loginFormComponent.prototype.showFormControls = function (form) {
        return form && form.controls['name'] &&
            form.controls['name'].value; // Dr. IQ
    };
    loginFormComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            templateUrl: 'app/login-form.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], loginFormComponent);
    return loginFormComponent;
}());
exports.loginFormComponent = loginFormComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=login-form.component.js.map